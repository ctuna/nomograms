package edu.berkeley.cs160.clairetuna.fingerpaint;


import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.util.AttributeSet;
import android.view.Gravity;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewGroup.MarginLayoutParams;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.SeekBar;
import android.widget.SimpleAdapter;
import android.widget.Spinner;
import android.widget.Toast;






public class MainActivity extends Activity{




	
	String filePath;
	
	HashMap<String, Object> map;
	ArrayList<HashMap> spinnerList= new ArrayList<HashMap>();
	MainView drawView;
	Paint mPaint;
	Button vButton;
	LinearLayout canvasContainer;
	FrameLayout paintContainer;
	Preview fingerprintPreview;
	RelativeLayout fingerprintContainer;
	Drawable brush;
	ColorWheel colorWheel;
	int conversionFactor=20;
	Button blackButton;
	Button whiteButton;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		//set view to our Mainview

		setContentView(R.layout.activity_main);	

		canvasContainer = (LinearLayout) findViewById(R.id.canvas);
		paintContainer = (FrameLayout) findViewById(R.id.pie);
		fingerprintContainer = (RelativeLayout) findViewById(R.id.fingerprint_container);
		
		drawView = new MainView(this);
		fingerprintPreview = new Preview(this);
		colorWheel = new ColorWheel(this, drawView, fingerprintPreview);
		blackButton= (Button) findViewById(R.id.blackButton);
		whiteButton= (Button) findViewById(R.id.whiteButton);
		blackButton.setOnClickListener(blackButtonListener);
		whiteButton.setOnClickListener(whiteButtonListener);
		canvasContainer.addView(drawView);
		paintContainer.addView(colorWheel);
		fingerprintContainer.addView(fingerprintPreview);
		fingerprintContainer.setGravity(Gravity.BOTTOM);
		fingerprintContainer.setVerticalGravity (Gravity.BOTTOM);
		drawView.setMode("scribble");
		SeekBar seekBar = (SeekBar)findViewById(R.id.seekBar1);
		seekBar.setOnSeekBarChangeListener(seekBarListener);
		instantiateSpinner();

	    }

	View.OnClickListener blackButtonListener = new View.OnClickListener(){
		
		public void onClick(View v){
			drawView.setColor(Color.BLACK);	
			fingerprintPreview.setFingerPrintColor(Color.BLACK);
		}
	};
	View.OnClickListener whiteButtonListener = new View.OnClickListener(){
		public void onClick(View v){
			drawView.setColor(Color.WHITE);	
			fingerprintPreview.setFingerPrintColor(Color.WHITE);
		}
	};
	public void instantiateSpinner(){
		
	
        //requestWindowFeature(Window.FEATURE_NO_TITLE);
        ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
  
        HashMap<String, Object> map = new HashMap<String, Object>();
        
        map.put("Name", "doodle");
        map.put("Icon", R.drawable.doodle);
        list.add(map);
        map = new HashMap<String, Object>();
        map.put("Name", "line");
        map.put("Icon", R.drawable.line);
        list.add(map);
        
        map = new HashMap<String, Object>();
        map.put("Name", "square");
        map.put("Icon", R.drawable.square);
        list.add(map);
        
        map = new HashMap<String, Object>();
        map.put("Name", "square_filled");
        map.put("Icon", R.drawable.square_filled);
        list.add(map);

        map = new HashMap<String, Object>();
        map.put("Name", "circle");
        map.put("Icon", R.drawable.circle);
        list.add(map);
        
        map = new HashMap<String, Object>();
        map.put("Name", "circle_filled");
        map.put("Icon", R.drawable.circle_filled);
        list.add(map);
        


        
        Spinner spin = (Spinner) findViewById(R.id.spinner);
        myAdapter adapter = new myAdapter(getApplicationContext(), list,
                R.layout.row, new String[] { "Name", "Icon" },
                new int[] { R.id.name, R.id.icon });

        spin.setAdapter(adapter);
        spin.setOnItemSelectedListener(spinnerListener);
        
	}

	    private class myAdapter extends SimpleAdapter {

	        public myAdapter(Context context, List<? extends Map<String, ?>> data,
	                int resource, String[] from, int[] to) {
	            super(context, data, resource, from, to);

	        }

	        @Override
	        public View getView(int position, View convertView, ViewGroup parent) {

	            if (convertView == null) {
	                convertView = getLayoutInflater().inflate(R.layout.row,
	                        null);
	            }

	            HashMap<String, Object> data = (HashMap<String, Object>) getItem(position);
	        
	            if (data.get("Name").equals("square")){
	            	((ImageView) convertView.findViewById(R.id.icon))
                    .setImageResource(R.drawable.square);
	            }
	            if (data.get("Name").equals("square_filled")){
	            	((ImageView) convertView.findViewById(R.id.icon))
                    .setImageResource(R.drawable.square_filled);
	            }
	            if (data.get("Name").equals("circle")){
	            	((ImageView) convertView.findViewById(R.id.icon))
                    .setImageResource(R.drawable.circle);
	            }
	            if (data.get("Name").equals("circle_filled")){
	            	((ImageView) convertView.findViewById(R.id.icon))
                    .setImageResource(R.drawable.circle_filled);
	            	
	            }
	            if (data.get("Name").equals("doodle")){
	            	((ImageView) convertView.findViewById(R.id.icon))
	            	.setImageResource(R.drawable.doodle);
	            	
	            }
	            if (data.get("Name").equals("line")){
	            	((ImageView) convertView.findViewById(R.id.icon))
	            	.setImageResource(R.drawable.line);
	            	
	            }

	            

	            return convertView;
	        }
	    }

	

	    AdapterView.OnItemSelectedListener spinnerListener = new AdapterView.OnItemSelectedListener() {
	   
	        public void onItemSelected(AdapterView<?> parent, View view, 
	                int pos, long id) {
	        	switch(pos){
	        		case (0):
	        			drawView.setMode("scribble");
	        			break;
	        		case(1):
	        			drawView.setMode("line");
	        			break;
	        		case(2):
	        			drawView.setMode("rectangleStroke");
        				break;
	        		case (3):
	        			drawView.setMode("rectangleFill");
	        			break;
	        		case (4):
	        			drawView.setMode("circleStroke");
	        			break;	
	        		case (5):
	        			drawView.setMode("circleFill");
	        			break;
	        		
	        		
	        	}
	            // An item was selected. You can retrieve the selected item using
	            // parent.getItemAtPosition(pos)
	        }

	        public void onNothingSelected(AdapterView<?> parent) {
	            // Another interface callback
	        }
	    };
	    
	    
	    
	SeekBar.OnSeekBarChangeListener seekBarListener = new SeekBar.OnSeekBarChangeListener(){

		@Override
		public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
			
			drawView.setStrokeWidth(progress+20);
			fingerprintPreview.setStrokeLevel(progress);
			
		}

		@Override
		public void onStartTrackingTouch(SeekBar seekBar) {
			//

		}

		@Override
		public void onStopTrackingTouch(SeekBar seekBar) {
			// 

		}
	};

	public void setMargins(View button, double marginLeft, double marginTop){


		    MarginLayoutParams marginParams = new MarginLayoutParams(button.getLayoutParams());

			int intMarginLeft = (int)Math.round(marginLeft)*conversionFactor;
			int intMarginTop = (int)Math.round(marginTop)*conversionFactor;
		    marginParams.setMargins(intMarginLeft, intMarginTop, 0, 0);
		    FrameLayout.LayoutParams layoutParams = new FrameLayout.LayoutParams(marginParams);
		    button.setLayoutParams(layoutParams);


	}

	




	

	View.OnClickListener toolButtonListener = new View.OnClickListener(){
		public void onClick(View v){
			
				//intent.putExtra("COST_OF_DINNER_MESSAGE", costString);
				//TODO: add current paint info
			
			}
			
			
	};


	public boolean onCreateOptionsMenu(Menu menu) {
		MenuInflater inflater = getMenuInflater();
		inflater.inflate(R.menu.activity_main, menu);
	   return true;
	}

	public boolean onOptionsItemSelected(MenuItem item) {
		
	      switch (item.getItemId()) {
	      case R.id.undo:
	    	   drawView.undo();
	            return true;
	      case R.id.redo:
	    	   drawView.redo();
	            return true;
	            
	      case R.id.clear:
	    	   drawView.clearCanvas();
	            return true;
	    
	      case R.id.menu_item_share:
	    	  Boolean aSuccess = saveBitmap();
	    	  	if (aSuccess) {
	    	  		Intent share = new Intent(Intent.ACTION_SEND);
	                share.setType("image/jpeg");
	                share.putExtra(Intent.EXTRA_STREAM,Uri.parse(filePath));
	                startActivity(Intent.createChooser(share, "Share Image"));  
	    	  	} else {
	    	  		Toast.makeText(this, "There was a problem saving the image.",
	                        Toast.LENGTH_SHORT).show();
	    	  	}
	            return true; 
	      case R.id.menu_item_save:
	    	  	Boolean bSuccess = saveBitmap();
	    	  	if (bSuccess) {
	    	  		Toast.makeText(this, "Image saved as Painting"+currentFileIndex+".jpg",
	                        Toast.LENGTH_SHORT).show();
	    	  	} else {
	    	  		Toast.makeText(this, "There was a problem saving the image.",
	                        Toast.LENGTH_SHORT).show();
	    	  	}
	    	  	return true;
	      default:
	            return super.onOptionsItemSelected(item);
	      }
	}

	private Boolean saveBitmap() {

	    ByteArrayOutputStream bytes = new ByteArrayOutputStream();
	    Bitmap currentBitmap = drawView.getBitmap();
	    currentBitmap.compress(Bitmap.CompressFormat.JPEG, 40, bytes);


	    //will create "test.jpg" in sdcard folder.
	    File f = new File(getExternalFilesDir(Environment.DIRECTORY_PICTURES) + File.separator + "Painting"+currentFileIndex+".jpg");

	    try {
			f.createNewFile();

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	    //write the bytes in file
	    FileOutputStream fo;
		try {
			fo = new FileOutputStream(f);
			fo.write(bytes.toByteArray());
			fo.flush();
			fo.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}

		 filePath = f.getAbsolutePath();
		 currentFileIndex++;
		return true;

	}

	int currentFileIndex=0;


	enum PaintMode {
	    Draw,
	    Erase,
	}
	/**
	 * TODO: document your custom view class.
	 */
	public class MainView extends View{

        private static final int BACKGROUND = Color.WHITE;

        private Bitmap  vBitmap;
        private Canvas  vCanvas;
        private Path    vPath;
        private Paint  vPaint;
        
        float oldX;
        float newX;
        float oldY;
        float newY;
        int strokeWidth;
        ArrayList<Path> paths= new ArrayList<Path>();
        ArrayList<Paint> paints = new ArrayList<Paint>();
        ArrayList<Path> undonePaths= new ArrayList<Path>();
        ArrayList<Paint> undonePaints = new ArrayList<Paint>();
        float startX;
        float startY;
        public void setStrokeWidth(int newWidth){
        	this.strokeWidth=newWidth;
        	vPaint.setStrokeWidth(strokeWidth);
        	
        }
        Paint erasePaint;
        public MainView(Context context, AttributeSet attrs) {
            super(context, attrs);
            
			vPath= new Path();
        }
        
        public MainView(Context c) {
        	
            super(c);
			vPath= new Path();
        }
        public Bitmap getBitmap(){
        	return vBitmap;
        }
        public void initializePaint(){
        	strokeWidth=30;
            vPaint= new Paint();
			vPaint.setStrokeWidth(strokeWidth);
            vPaint.setColor(Color.BLACK);
			vPaint.setStyle(Paint.Style.STROKE);
			vPaint.setStrokeWidth(strokeWidth);
			vPaint.setStrokeCap(Paint.Cap.ROUND);
			vPaint.setAntiAlias(true);
			erasePaint = new Paint();
			erasePaint.setStrokeWidth(500);
			erasePaint.setColor(Color.WHITE);
        }
        public void setColor(int color){
        	vPaint.setColor(color);
        }
        
        @Override
        protected void onSizeChanged(int w, int h, int oldw, int oldh) {
            super.onSizeChanged(w, h, oldw, oldh);
            //called only once in initialization
            vBitmap = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
            vCanvas = new Canvas(vBitmap);
            initializePaint();
            mode="scribble";
            startX=0;
            startY=0;
        }

        
        public void setMode(String newMode){
        	mode=newMode;
        }
        @Override
        protected void onDraw(Canvas canvas) {
            canvas.drawColor(BACKGROUND);
            canvas.drawBitmap(vBitmap, 0, 0, null);
            
        }
        
        public void clearCanvas(){
        	vPath.reset();
        	
            vPath.addCircle(407, 419, getWidth(), Path.Direction.CCW);
            paths.add(vPath);
        	paints.add(new Paint(erasePaint));
        	vCanvas.drawPath(vPath, erasePaint);
        	//vCanvas.drawColor(BACKGROUND);
        	invalidate();
        }
       
        public void undo(){  
        	if (paths.size()>0){
        	vCanvas.drawColor(BACKGROUND);
        	undonePaths.add(paths.remove(paths.size()-1));
        	undonePaints.add(paints.remove(paints.size()-1));
        	Paint currentPaint;
        	        for (int i = 0; i < paths.size();i++){
        	        	currentPaint = paints.get(i);
        	            vCanvas.drawPath(paths.get(i), currentPaint);
        	        }
        	        invalidate();
        	}
        	else {        		        		
        		Context context = getApplicationContext();
        		CharSequence text = "There is no paint left to erase";
        		int duration = Toast.LENGTH_SHORT;
        		Toast toast = Toast.makeText(context, text, duration);
        		toast.show();
        	}

        	
        }
        
        public void redo (){
        	   if (undonePaths.size()>0) { 
        	       paths.add(undonePaths.remove(undonePaths.size()-1)); 
        	       paints.add(undonePaints.remove(undonePaints.size()-1)); 
        	       if (paths.size()>0){
        	    	   
               		vCanvas.drawColor(BACKGROUND);
               		Paint currentPaint;
               	        for (int i = 0; i < paths.size();i++){
               	        	currentPaint = paints.get(i);
               	            vCanvas.drawPath(paths.get(i), currentPaint);
               	        }
               	        
        	       }invalidate();
        	   }
        	   
        	   else {
        		Context context = getApplicationContext();
           		CharSequence text = "Nothing left to redo";
           		int duration = Toast.LENGTH_SHORT;
           		Toast toast = Toast.makeText(context, text, duration);
           		toast.show();
        	   }
        	     //toast the user 
        	}
        
        boolean newShape=false;
        
        String mode; 
        public boolean onTouchEvent(MotionEvent event) {
        	if (mode.equals("scribble")){
        		vPaint.setStyle(Paint.Style.STROKE);
        	}
            newX = event.getX();
            newY = event.getY();
            float dX;
            float dY;
            dX=newX-startX;
    		dY=newY-startY;
            if (mode.equals("circleStroke") || mode.equals("rectangleStroke")){
            	vPaint.setStyle(Paint.Style.STROKE);
            }

            if (event.getAction()== MotionEvent.ACTION_DOWN){
            	newShape = true;
            	startX = newX;
        		startY=newY;
        		vPaint.setStrokeCap(Paint.Cap.ROUND);
        		vPath= new Path();
                vPath.moveTo(newX, newY);
                
            	if (mode.equals("scribble")){
                vPaint.setStyle(Paint.Style.STROKE);
                vCanvas.drawPath(vPath, vPaint);
            	}
                
                }
           
            else if (event.getAction()== MotionEvent.ACTION_UP){
            	
            	if (mode.equals("rectangleFill")){
            		vPaint.setStyle(Paint.Style.FILL);}
            	if (mode.equals("rectangleFill")|| mode.equals("rectangleStroke")){
            		undo();
            		drawRectangle(startX, startY, newX, newY);
            		
            		vPaint.setStrokeCap(Paint.Cap.SQUARE);
            		
            		vPath.reset();
                    vPath.moveTo(startX, startY);
            		//--->
            		vPath.lineTo(startX+dX, startY);
            		//down
            		vPath.lineTo(startX+dX, startY+dY);
            		//<------
            		vPath.lineTo(startX, startY+dY);
            		//^
            		vPath.lineTo(startX, startY);
            	}    
            	

            	if (mode.equals("circleFill")){
            		vPaint.setStyle(Paint.Style.FILL);}
            	
            	if (mode.equals("circleFill")|| mode.equals("circleStroke")){
            		undo();     			   
            		float centerX = (startX+newX)/2;
            		float centerY = (startY+newY)/2;
            		vPaint.setStrokeCap(Paint.Cap.SQUARE);
            		
            		double diameter = Math.sqrt((Math.pow(dX, 2) + Math.pow(dY, 2)));
            		float radius = (float) diameter/2;
            		drawCircle(centerX, centerY, radius);
            		vPath.reset();
            		vPath.addCircle(centerX, centerY, radius, Path.Direction.CCW);
            		
            	}  
            	else if (mode.equals("line")){
            		           		
      				undo();
            		vPath= new Path();
            		
            		vPath.moveTo(startX, startY);
            		vPath.lineTo(newX, newY);
            		
      		   		vCanvas.drawLine(startX, startY, newX, newY, vPaint);
        	}
            	else if (mode.equals("scribble")){
            	
            	
            	}
            	paths.add(vPath);
            	paints.add(new Paint(vPaint));
            	vPath = new Path();
            	
            }
            else {
         	   //DRAGGING
         	   
         	   if (newX!=startX && newY!=startY){
         		   if (mode.equals("rectangleFill")|| mode.equals("rectangleStroke")){
         			   //undo() versions of rectangle;
         			   if (!newShape){
         				   undo();
         			   }
         			   newShape=false;
         		   		
         		   
         			   drawRectangle(startX, startY, newX, newY);

         			   dX=newX-startX;
         			   dY=newY-startY;
            		
         			   vPath= new Path();
            		//make a path of current rectangle
          		   		vPath.moveTo(startX, startY);
            		//--->
          		   		vPath.lineTo(startX+dX, startY);
            		//down
          		   		vPath.lineTo(startX+dX, startY+dY);
            		//<------
          		   		vPath.lineTo(startX, startY+dY);
            		//^
          		   		vPath.lineTo(startX, startY);
            		//add to paths
          		   		paths.add(vPath);
          		   		paints.add(new Paint(vPaint));
            		
            	
            		}
         		   else if (mode.equals("circleFill")){
                		vPaint.setStyle(Paint.Style.FILL);}
                	if (mode.equals("circleFill")|| mode.equals("circleStroke")){
                		if (!newShape){
          				   undo();
          			   }
          			    newShape=false;
                		float centerX = (startX+newX)/2;
                		float centerY = (startY+newY)/2;
                		vPaint.setStrokeCap(Paint.Cap.SQUARE);
                		vPath= new Path();
                		double diameter = Math.sqrt((Math.pow(dX, 2) + Math.pow(dY, 2)));
                		float radius = (float) diameter/2;
                		vPath.addCircle(centerX, centerY, radius, Path.Direction.CCW);
                		drawCircle(centerX, centerY, radius);
                		paths.add(vPath);
          		   		paints.add(new Paint(vPaint));
                		
                	} 
                	else if (mode.equals("line")){
                		
                    		if (!newShape){
              				   undo();
              			   }
              			    newShape=false;
                    		vPath= new Path();
                    		vPath.moveTo(startX, startY);
                    		vPath.lineTo(newX, newY);
                    		paths.add(vPath);
              		   		paints.add(new Paint(vPaint));
              		   		vCanvas.drawLine(startX, startY, newX, newY, vPaint);
                	}
                	
                else if (mode.equals("scribble")){
             	vPath.quadTo(oldX, oldY, (oldX+newX)/2, (oldY+newY)/2);
             	vCanvas.drawPath(vPath, vPaint);
             	
             	}
             	
         	   }
             	invalidate();
             	
             }
         
            
            
            oldX=newX;
            oldY=newY;
            
         return true;   
        }

        public void drawRectangle(float startX, float startY, float newX, float newY){
        	
    		float dX=newX-startX;
    		float dY=newY-startY;
    		
    		vCanvas.drawRect(startX, startY, startX+dX, startY + dY, vPaint);
    	}
        
        
        public void drawCircle(float x, float y, float radius){
        	
    		
    		vCanvas.drawCircle(x, y, radius, vPaint);
    	}
    }

    }




	
