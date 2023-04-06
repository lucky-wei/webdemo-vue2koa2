export default{
    data(){
        return{
            minxinData:'小胡'
        }
    },
    created(){
        console.log('mixins created')
    },
    methods:{
        testMinxin(){
            console.log('test minxin')
        }
    }
}