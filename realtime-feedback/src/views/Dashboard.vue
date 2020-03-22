  <template>
  <div class="dashboard">
    <h1>Here's a summmary of how users feel about your service in realtime</h1>
    <div>
      <template v-for="(emotion, index) in emotions">
        <div :key="index">
          <strong>{{index}}</strong> clients: {{ emotion }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data: function(){
    return {
      emotions: {
        angry: 0,
        neutral: 0,
        happy: 0
      },
      pusher_obj: null,
      e_channel: null,
    }
  },
  mounted: function(){
    this.init();
  },
  methods: {
    init (){
    
    },
  },
}
</script>
