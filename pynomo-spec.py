main_params = { # one page
  'filename': 'ex_second_order_eq.pdf',
  'paper_height': 10.0,
  'paper_width': 10.0,
  'block_params': [ # list of nomograms
    { # one "type 10" nomogram
      'block_type': 'type_10',
      'width': 10.0,
      'height': 10.0,
      'f1_params': { # left axis spec.
        'u_min': -10.0,
        'u_max': 10.0,
        'function': lambda u: u,
        'title': 'q' },
      'f2_params': { # right axis spec.
        'u_min': -10.0,
        'u_max': 10.0,
        'function': lambda u: u,
        'title': 'p' },
      'f3_params': { # curved axis spec.
        'u_min': 0.0,
        'u_max': 12.0,
        'function_3': lambda u: u,
        'function_4': lambda u: u**2,
        'title': 'z' }
    } # end "type 10" nomogram
  ] # end list of nomograms
} # end of specification
pynomo.nomographer.Nomographer(main_params)
