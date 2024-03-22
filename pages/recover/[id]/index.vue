<template>

    <div>
    Debugging Route2: {{ $route.params.id }}
  </div>

</template>

<script>
import { useUserStore } from "../../stores/users";
import axios from "axios";
 
export default defineComponent({
  components: {},
  created() {},
  mounted() {

    this.something();

  },
  data() {
    return {
      token: "",
    };
  },
    methods: {
        something() {
            try{

                this.token = this.$route.params.id;
                console.log(this.token);

            }catch(error){

                console.log(error);

            }
        },

    },
  setup() {},
});




</script>