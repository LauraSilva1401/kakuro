<template>


</template>

<script>
 
export default defineComponent({
  components: {},
  created() {},
  mounted() {

    this.preview();

  },
  data() {
    return {
    };
  },
    methods: {

        preview() {
            try{

                this.$router.push('/login');
             
            }catch(error){

                console.log(error);

            }
        }

    },
  setup() {},
});




</script>