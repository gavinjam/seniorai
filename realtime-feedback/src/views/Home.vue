<!-- src/views/Home.vue --> 
    <template>
      <div class="train">
        <template v-if="mode == 'train'">
            <h4>Take pictures that define your different moods in the dropdown</h4>
        </template>
        <template v-else>
            <h4>Take a picture to let us know how you feel about our service</h4>
        </template>
        <select id="use_case" v-on:change="changeOption()">
            <option value="train">Train</option>
            <option value="test">Test</option>
        </select>
        <br>
        <br>
        <Camera></Camera>
        <br>
        <template v-if="mode == 'train'">
            <select id="emotion_options">
                <template v-for="(emotion, index) in emotions">
                    <option :key="index" :value="index">{{emotion}}</option>
                </template>
            </select>
            <button v-on:click="trainModel()">Train Model</button>
        </template>
        <template v-else> 
            <button v-on:click="getEmotion()">Get Emotion</button>
        </template>
        <h1>{{ detected_e }}</h1>
        <hr style='width:70%'>
      <button v-on:click="goToTutorial()"><b>I am done. Take me to Tutorial >> </b></button>

      </div>
    </template>

    <script>
    // @ is an alias to /src
    import Camera from "@/components/Camera.vue";
    import * as tf from '@tensorflow/tfjs';
    import * as mobilenetModule from '@tensorflow-models/mobilenet';
    import * as knnClassifier from '@tensorflow-models/knn-classifier';
    import axios from 'axios';

    export default {
      name: "Home",
      components: {
        Camera
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
            //alert(this.detected_e)
            this.registerEmotion();
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