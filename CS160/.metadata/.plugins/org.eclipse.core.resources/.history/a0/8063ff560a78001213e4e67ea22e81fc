package edu.berkeley.cs160.clairetuna.fingerpaint;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffColorFilter;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.ScaleDrawable;
import android.util.AttributeSet;
import android.view.View;

public class Preview extends View{

    private static final int BACKGROUND = Color.WHITE;
    int redOrange = getResources().getColor(R.color.RedOrange);
    int red = getResources().getColor(R.color.Red);
    int redViolet = getResources().getColor(R.color.RedViolet);
    int violet = getResources().getColor(R.color.Violet);
    int blueViolet = getResources().getColor(R.color.BlueViolet);
    int blue = getResources().getColor(R.color.Blue);
    int blueGreen = getResources().getColor(R.color.BlueGreen);
    int green = getResources().getColor(R.color.Green);
    int yellowGreen = getResources().getColor(R.color.YellowGreen);
    int yellow = getResources().getColor(R.color.Yellow);
    int yellowOrange = getResources().getColor(R.color.YellowOrange);
    int orange = getResources().getColor(R.color.Orange);

    int white =  getResources().getColor(R.color.White);
    int black = getResources().getColor(R.color.Black);
    private Bitmap  vBitmap;
    private Canvas  vCanvas;
    private Path    vPath;
    private Paint  vPaint;
    private Paint whitePaint;
    Bitmap currentFingerprint;
    Bitmap originalFingerprint;
    int originalHeight = 150;
    int originalWidth = 150;
    int currentColor;   
    Drawable stroke;
    ScaleDrawable strokeScalable;
    float newX;
    float newY;
    int strokeWidth;
    Resources res;
    int[] centerCoordinates;
    int radius=25;
    
    
    
    
    public void setStrokeWidth(int newWidth){
    	this.strokeWidth=newWidth;
    	vPaint.setStrokeWidth(strokeWidth);
    	
    }
    
    public Preview(Context context, AttributeSet attrs) {
        super(context, attrs);


    }
    
    public Preview(Context c) {
    	
        super(c);

		vPath= new Path();	
    }

    
    public void setColor(int color){
    	vPaint.setColor(color);
    }
    
    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        vBitmap = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        vCanvas = new Canvas(vBitmap);
        vPaint= new Paint();
        vPaint.setColor(Color.BLACK);
		vPaint.setStyle(Paint.Style.STROKE);
		vPaint.setStrokeWidth(30);
		whitePaint=new Paint();
		whitePaint.setColor(Color.WHITE);
    }
@Override
	public void onLayout(boolean bo, int a , int b, int c, int d ){
		super.onLayout(bo, a, b, c, d);

        centerCoordinates = new int[2];
        this.getLocationOnScreen(centerCoordinates);
        invalidate();
}
    public void setStrokeLevel(int size){
    	radius = (size+10)/2;
    	vPaint.setStrokeWidth(size);  
    	invalidate();
    }
    
    public void setFingerPrintColor(int currentColor){
    	vPaint.setColor(currentColor);
    	invalidate();
    }
    
   
    
    
    		
    
    @Override
    protected void onDraw(Canvas canvas) {
    	res = getResources();
    	//TODO: make paint
    	vPaint.setStyle(Paint.Style.FILL);
    	canvas.drawCircle(110, 100, radius+ 3, whitePaint);
    	canvas.drawCircle(110, 100, radius,  vPaint);
    	
        
    }
    
    public void clearCanvas(){
    	vCanvas.drawColor(BACKGROUND);
    	invalidate();
    }
    


}
	

	