  <template>
  <div class="tutorial">
    <CameraHidden></CameraHidden>
    <!-- <h3>Your math tutorial for today</h3> -->
    <div style='position:absolute; top:20px; right:94px'><a href="/">Profile</a> | </div>
    <div style ="position:absolute; left:300px">

      <form name="testQuestionForm" method="post" action="/quizzes/sat_math/quadratic_equations/quiz10283.html">

<input type="hidden" name="id" value="1">
<input type="hidden" name="qid" value="42047">
<input type="hidden" name="themeId" value="10283">
<input type="hidden" name="qtype" value="0">
<input type="hidden" name="status" value="">

<input type="hidden" name="quizCube" value="1">
	
	<!-- back to results page -->
	<strong>If y<sup>2</sup> + y = 12 , what is the greatest possible value of y<sup>2</sup>?</strong>

 <table style="align:left" width="410"><tbody><tr><th width="400"> </th></tr><tr><td width="400" align="left">
   <input type="radio" name="userans" value="A"><strong>A: </strong>4<br></td></tr><tr><td width="400" align="left">
     <input type="radio" name="userans" value="B"><strong>B: </strong>8<br></td></tr><tr><td width="400" align="left">
       <input type="radio" name="userans" value="C"><strong>C: </strong>9<br></td></tr><tr><td width="400" align="left">
         <input type="radio" name="userans" value="D"><strong>D: </strong>16<br></td></tr><tr><td width="400" align="left">
           <input type="radio" name="userans" value="E"><strong>E: </strong>144<br></td></tr></tbody></table>

 


		<input type="submit" value="Submit">
		<input type="submit" name="org.apache.struts.taglib.html.CANCEL" value="Cancel" onclick="bCancel=true;"> 

		<input type="Submit" name="Submit" value="End Quiz">

</form>
    </div>
  </div>
</template>

<script>
    // @ is an alias to /src
    import CameraHidden from "@/components/CameraHidden.vue";
    import * as tf from '@tensorflow/tfjs';
    import * as mobilenetModule from '@tensorflow-models/mobilenet';
    import * as knnClassifier from '@tensorflow-models/knn-classifier';
    import axios from 'axios';

    export default {
      name: "Tutorial",
      components: {
        CameraHidden
      },
      data: function(){
          return {
              emotions: ['angry','neutral', 'happy'],
              classifier: null,
              mobilenet: null,
              class: null,
              detected_e: null,
              mode: 'train',
          }
      },
    
    mounted: function(){
          this.init();
      },
      methods: {  
          async init(){
            // load the load mobilenet and create a KnnClassifier
            this.classifier = knnClassifier.create();
            this.mobilenet = await mobilenetModule.load();
            setTimeout(function(){
              //this.getEmotion();
              window.open("http://www.ad-freegames.com/category/driving/","_game")
            }, 5000)
          },
          trainModel(){
            let selected = document.getElementById("emotion_options");
            this.class = selected.options[selected.selectedIndex].value;
            this.addExample();
          },
          addExample(){
            const img= tf.fromPixels(this.$children[0].webcam.webcamElement);
            const logits = this.mobilenet.infer(img, 'conv_preds');
            this.classifier.addExample(logits, parseInt(this.class));
            /*
            Change method

            website
            */
            //alert(this.class)
          },
          async getEmotion(){
            const img = tf.fromPixels(this.$children[0].webcam.webcamElement);
            const logits = this.mobilenet.infer(img, 'conv_preds');
            const pred = await this.classifier.predictClass(logits);
            this.detected_e = this.emotions[pred.classIndex];
            alert(this.detected_e)
            //this.registerEmotion();
          },
          changeOption(){
              const selected = document.getElementById("use_case");
              this.mode = selected.options[selected.selectedIndex].value;
          },
          registerEmotion(){
              axios.post('http://localhost:3128/callback', {
                  'emotion': this.detected_e
              }).then( () => {
                  alert('Thanks for letting us know how you feel');
              });
          },
          goToTutorial(){
            window.open("http://localhost:8080/tutorial","_self")
          }
        }
    };
    </script>