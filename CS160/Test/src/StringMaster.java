
public class StringMaster {
	int decimalIndex;
	public String addText(String currentCost, String newText){
		decimalIndex=currentCost.indexOf(".");
		//String currentCost = cost.getText().toString();
		
		//concatenate new number to tail
		currentCost=currentCost+newText;
		
		//remove decimal
		currentCost=currentCost.substring(0, decimalIndex)+currentCost.substring(decimalIndex+1, currentCost.length());
		decimalIndex++;
		currentCost=currentCost.substring(0, decimalIndex)+ "."+ currentCost.substring(decimalIndex, currentCost.length());
		//delete leading 0
		if (currentCost.contains("$0.")){

			currentCost="$"+currentCost.substring(2, currentCost.length());
		}
		return currentCost;
	}
	
	public String removeText(String currentCost){
		String currentCost = cost.getText().toString();
		decimalIndex=currentCost.indexOf(".");
		//remove from tail
		currentCost=currentCost.substring(0, currentCost.length()-1);
		System.out.println("currentCost 1 is : "+ currentCost);
		//if we need to add back a 0
		if (currentCost.substring(0, decimalIndex).equals("$")){
			System.out.println("currentCost 2 is : "+ currentCost);
			currentCost="$.0"+currentCost.substring(currentCost.length()-1, currentCost.length());

		}
		else{
		//remove decimal
		currentCost=currentCost.substring(0, decimalIndex)+currentCost.substring(decimalIndex+1, currentCost.length());
		decimalIndex--;
		//put decimal back
		currentCost=currentCost.substring(0, decimalIndex)+ "."+ currentCost.substring(decimalIndex, currentCost.length());
		}
		
		cost.setText(currentCost);
	}
}
