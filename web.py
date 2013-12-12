import ast, math, json, os
import flask
import pynomo.nomographer

def get_ticks_sub(f, g, tick_list, dx_units, dy_units):
    return [{'u': u, 'x': f(u), 'y': g(u), 'dx': dx, 'dy': dy} for u, dx, dy in zip(tick_list, dx_units, dy_units)]

def get_ticks(atom):
    axis = atom.axis
    f = atom.give_x
    g = atom.give_y
    ticks = [
        (axis.tick_0_list, axis.dx_units_0, axis.dy_units_0),
        (axis.tick_1_list, axis.dx_units_1, axis.dy_units_1),
        (axis.tick_2_list, axis.dx_units_2, axis.dy_units_2),
        (axis.tick_3_list, axis.dx_units_3, axis.dy_units_3),
        (axis.tick_4_list, axis.dx_units_4, axis.dy_units_4)
    ]
    return [get_ticks_sub(f, g, *lists) for lists in ticks]

def get_atom_data(atom):
    return {
        'name': atom.params['title'],
        'points': [{'x': x, 'y': y, 'u': u} for (x, y), u in zip(atom.line, atom.value_list)],
        'ticks': get_ticks(atom)
    }

# http://docs.python.org/2/library/ast.html#abstract-grammar
allowedNodes = set()
allowedNodes.add(ast.BinOp)
allowedNodes.add(ast.Add)
allowedNodes.add(ast.Sub)
allowedNodes.add(ast.Mult)
allowedNodes.add(ast.Div)
allowedNodes.add(ast.Pow)
allowedNodes.add(ast.Num)
allowedNodes.add(ast.Name)
allowedNodes.add(ast.Load)

# http://docs.python.org/2/library/math.html
allowedMath = {
    'exp': math.exp,
    'log': math.log
}

def makeLambda(spec):
    root = ast.parse(spec)
    if type(root) is not ast.Module:
        raise Exception('we don\'t allow %s', type(root))
    if len(root.body) != 1:
        raise Exception('%d is too many statements', len(root.body))
    if type(root.body[0]) is not ast.Expr:
        raise Exception('we don\'t allow %s', type(root.body[0]).__name__)
    expr = root.body[0].value
    paramName = None
    for node in ast.walk(expr):
        nodeType = type(node)
        if nodeType not in allowedNodes:
            raise Exception('we don\'t allow %s', nodeType.__name__)
        if nodeType is ast.Name:
            if node.id not in allowedMath:
                if paramName is None:
                    paramName = node.id
                else:
                    raise Exception('we don\'t have %s', node.id)
    if paramName is None:
        # constant function??
        paramName = '_'
    return eval(compile(ast.fix_missing_locations(ast.Expression(ast.Lambda(ast.arguments(args=[ast.Name(paramName, ast.Param())], defaults=[]), expr))), '(input)', 'eval'), allowedMath)

class NomoDecoder(json.JSONDecoder):
    def __init__(self, **kwargs):
        json.JSONDecoder.__init__(self, object_hook=NomoDecoder.object_hook, parse_int=float, **kwargs)
    @staticmethod
    def object_hook(o):
        if '__lambda__' in o:
            return makeLambda(o['body'])
        return o


app = flask.Flask(__name__)
app.json_decoder = NomoDecoder

ALLOW = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
}

@app.route('/main', methods=['POST', 'OPTIONS'])
def main():
    if flask.request.method == 'OPTIONS':
        return ('', 200, ALLOW)
    params = flask.request.get_json()
    params['filename'] = []
    params['paper_height'] = 10.0
    params['paper_width'] = 10.0
    n = pynomo.nomographer.Nomographer(params)
    out = []
    for block in n.blocks:
        for atom in block.atom_stack:
            out.append(get_atom_data(atom))
    return (json.dumps(out), 200, {'Content-Type': 'application/json'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', '5000')))
