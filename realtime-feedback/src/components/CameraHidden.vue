 <!-- src/components/Camera.vue -->
    <template>
      <div>
          <video autoplay playsinline muted id="webcam" width="20" height="20"></video>
      </div>
    </template>

    <script>
    import {Webcam} from '../assets/webcam'

    export default {
      name: "CameraHidden",
      data: function(){
          return {
              webcam: null,
          }
      },
      mounted: function(){
          this.loadWebcam();
      },
      methods: {
          loadWebcam: function(){
              this.webcam = new Webcam(document.getElementById('webcam'));
              this.webcam.setup();
          }
      }
    };
    </script>