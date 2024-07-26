<template>
    <div class="container">
        <div class="row d-flex justify-content-center info-box bg-yellow-gradient" v-if="pool">
            <div class="col-auto statsbox">
                <h6><b>Blockchain<br> Height</b></h6>
                <hr>
                <h6>{{ pool.networkStats.blockHeight }}</h6>
            </div>
            <div class="col-auto statsbox">
                <h6><b>Pending<br> Blocks</b></h6>
                <hr>
                <h6>{{ filterPending.length }}</h6>
            </div>
            <div class="col-auto statsbox">
                <h6><b>Confirmed<br> Blocks</b></h6>
                <hr>
                <h6>{{ pool.totalBlocks }}</h6>
            </div>
            <div class="col-auto statsbox">
                <h6><b>Coin<br> Price</b></h6>
                <hr>
                <h6>${{formatHashrate(coinPrice,7,"") }}</h6>
            </div>
            <div class="col-auto statsbox">
                <h6><b>Block<br> Value</b></h6>
                <hr>
                <h6 v-if="filterConfirmed[0]">${{formatHashrate(coinPrice * filterConfirmed[0].reward,4,"")}}</h6>
                <h6 v-else>Wait...</h6>
            </div>
            <div class="col-auto statsbox">
                <h6><b>Block<br> Reward</b></h6>
                <hr>
                <h6 v-if="filterConfirmed[0]">{{formatHashrate(filterConfirmed[0].reward,1,pool.coin.symbol)}}</h6>
                <h6 v-else>Wait...</h6>
            </div>
            <div class="col-auto statsbox">
                <h6><b>Connected<br> Peers</b></h6>
                <hr>
                <h6>{{ pool.networkStats.connectedPeers }}</h6>
            </div>
            <div class="col-auto statsbox">
                <h6><b>Payment<br> Threshold</b></h6>
                <hr>
                <h6>{{ pool.paymentProcessing.minimumPayment }} {{ pool.coin.symbol }}</h6>
            </div>
            <div class="col-auto statsbox">
                <h6><b>Pool<br> Fee</b></h6>
                <hr>
                <h6>{{ pool.poolFeePercent }}%</h6>
            </div>
            <div class="col-auto statsbox">
                <h6><b>Pool<br> Effort</b></h6>
                <hr>
                <h6>{{ formatHashrate(PoolEffort,2,"%") }}</h6>
            </div>
            <div class="col-auto statsbox">
                <h6><b>Pool<br> TTF</b></h6>
                <hr>
                <h6>{{convertTime(pool.networkStats.networkHashrate / pool.poolStats.poolHashrate * pool.blockRefreshInterval) }}</h6>
            </div>
            <div class="col-auto statsbox">
                <h6><b>Total<br> Paid</b></h6>
                <hr>
                <h6>{{ formatHashrate(pool.totalPaid,3,"") }} [{{ pool.coin.symbol }}]</h6>
            </div>
        </div>
        <div class="row d-flex justify-content-center info-box bg-yellow-gradient">
            <eChart/>
        </div>
       
    </div> 
  </template>
  
  <script setup lang="ts">
    //import axios from 'axios'
    import {ref,computed, watch, onMounted} from 'vue'
    import {useRoute} from 'vue-router'
    import eChart from './../components/eChart.vue'
    import {Pool} from '@/definitions/pool.model'
    import {getCoin} from '@/services/getCoin'
    import {getBlocks} from '@/services/getBlocks'
    import {setCoinPrice} from '@/services/setCoinPrice'
    //import {formatHashrate} from '@/services/formatHashrate'
    import {convertTime} from '@/services/convertTime'
    const pool = ref<Pool>();
    const blocks = ref([]);
    //const newBlocks = ref([]);
    const coinPrice = ref(0);
    const PoolEffort = ref(0);
    const route = useRoute();
    const id = ref(route.params.id);
    const effortClass =ref("");

    watch(blocks,(newValue,oldValue) => { 
      if(newValue != oldValue) {
          setTimeout(() => {
              updateData()
          }, 60000);
      }});

    function updateData() {            
        //getPools()
        //getBlocks()
        setupCoin(id.value)
    }

    async function setupCoin(coinId) {
    pool.value = await getCoin(coinId)
    //getNewBlocks()
    setupBlocks(id.value)
    //setPrice(pool.value.coin.symbol)
    setupCoinPrice(pool.value.coin.symbol)
    checkEffort(pool.value.coin.family,pool.value.poolEffort, pool.value.coin.name)
    //calcEffort(pool.value.coin.family,pool.value.poolEffort, pool.value.coin.name)
    }

    async function setupBlocks(coinId) {
    const height = ((pool.value.networkStats.blockHeight < 100) ? pool.value.networkStats.blockHeight : 100)
    blocks.value = await getBlocks(coinId, height)
    }

    async function setupCoinPrice(coinId) {
    coinPrice.value = await setCoinPrice(coinId)
    }
    
    /*
    function getPools() {
        axios
        .get('https://pool.flazzard.com/api/pools/' + id.value)
        .then((response) => {
              pool.value = response.data.pool
              //console.log("Returned Pool: ", pool.value)
              getNewBlocks()
              setPrice(pool.value.coin.symbol)
              checkEffort(pool.value.coin.family,pool.value.poolEffort, pool.value.coin.name)
        })
        .catch((error) => {
              console.warn("getPools error: ", error)
        })
    }
    
    function setPrice(ticker:string) {
      axios.get('https://api.xeggex.com/api/v2/market/getbysymbol/' + ticker + '%2FUSDT')
          .then((response) => {
              //set coin price
              coinPrice.value = response.data.lastPrice
              //console.log("Returned coin price: ", coinPrice.value)
          })
          .catch((error) => {
              console.warn("getPrice error: ", error)
              //if price does not exist.
              coinPrice.value = 0;
          })                      
    }
    
    function getBlocks() {
      axios
      .get('https://pool.flazzard.com/api/pools' + '/' + id.value + '/blocks')
      .then((response) => {
          blocks.value =response.data
          //console.log("Returned Blocks: ", response.data)

      })
      .catch((error) => {
          console.warn("getBlocks error: ", error)
      })
      
  }
      
  function getNewBlocks() {
      var height:number
      height = ((pool.value.networkStats.blockHeight < 100) ? pool.value.networkStats.blockHeight : 100)
      axios
      .get('https://pool.flazzard.com/api/pools' + '/' + id.value + '/blocks?page=0&pageSize=' + height)
      .then((response) => {
          newBlocks.value =response.data
          console.log("Returned newBlocks: ", response.data)

      })
      .catch((error) => {
          console.warn("getBlocks error: ", error)
      })
      
  }
  */
    const filterPending = computed(function() {
          return blocks.value.filter((block) => block.status=='pending')
    });
    const filterConfirmed = computed(function() {
          return blocks.value.filter((block) => block.status=='confirmed')
    });
    
    function formatHashrate(value:number, decimal:number, unit:string) {
      if (value === 0) {
          return "0 " + unit;
      } else {
          var si = [
          { value: 1, symbol: "" },
          { value: 1e3, symbol: "k" },
          { value: 1e6, symbol: "M" },
          { value: 1e9, symbol: "G" },
          { value: 1e12, symbol: "T" },
          { value: 1e15, symbol: "P" },
          { value: 1e18, symbol: "E" },
          { value: 1e21, symbol: "Z" },
          { value: 1e24, symbol: "Y" }
          ];
          for (var i = si.length - 1; i > 0; i--) {
          if (value >= si[i].value) {
              break;
          }
          }
          return ((value / si[i].value).toFixed(decimal).replace(/.0+$|(.[0-9]*[1-9])0+$/, "$1") + " " + si[i].symbol + unit);
          }
      }
    /*
// String Convert -> Seconds
  function readableSeconds(t) {
      var seconds = Math.floor(t % 3600 % 60);
      var minutes = Math.floor(t % 3600 / 60);
      var hours = Math.floor(t % 86400 / 3600);
      var days = Math.floor(t % 604800 / 86400);	
      var weeks = Math.floor(t % 2629799.8272 / 604800);
      var months = Math.floor(t % 31557597.9264 / 2629799.8272);
      var years = Math.floor(t / 31557597.9264);

      var sYears = years > 0 ? years + ((years== 1) ? "y" : "y") : "";
      var sMonths = months > 0 ? ((years > 0) ? " " : "") + months + ((months== 1) ? "mo" : "mo") : "";
      var sWeeks = weeks > 0 ? ((years > 0 || months > 0) ? " " : "") + weeks + ((weeks== 1) ? "w" : "w") : "";
      var sDays = days > 0 ? ((years > 0 || months > 0 || weeks > 0) ? " " : "") + days + ((days== 1) ? "d" : "d") : "";
      var sHours = hours > 0 ? ((years > 0 || months > 0 || weeks > 0 || days > 0) ? " " : "") + hours + (hours== 1 ? "h" : "h") : "";
      var sMinutes = minutes > 0 ? ((years > 0 || months > 0 || weeks > 0 || days > 0 || hours > 0) ? " " : "") + minutes + (minutes == 1 ? "m" : "m") : "";
      var sSeconds = seconds > 0 ? ((years > 0 || months > 0 || weeks > 0 || days > 0 || hours > 0 || minutes > 0) ? " " : "") + seconds + (seconds == 1 ? "s" : "s") : ((years < 1 && months < 1 && weeks < 1 && days < 1 && hours < 1 && minutes < 1 ) ? " Few milliseconds" : "");
      if (seconds > 0) return sYears + sMonths + sWeeks + sDays + sHours + sMinutes + sSeconds;
      else return 'unknown';
  }
      */
  function checkEffort(family:string, poolEffort:number, coinName:string) {
      if (family == "alephium") {
          PoolEffort.value = Number(poolEffort) * Math.pow(2, 30) * 100;
          // Bitcoin (family)
      } else if (family == "bitcoin") {
          // Vertcoin (coin)
          if (coinName == "Vertcoin") {
          PoolEffort.value = (Number(poolEffort) / 256) * 100;
          // VishAI (coin)
          } else if (coinName == "Vishai") {
          PoolEffort.value = (Number(poolEffort) / 65536) * 100;
          // Reaction (coin)
          } else if (coinName == "Reaction") {
          PoolEffort.value = (Number(poolEffort) / 65536) * 100;
          } else {
          PoolEffort.value = Number(poolEffort) * 100;
          }
          // Kaspa (family)
      } else if (family == "kaspa") {
          PoolEffort.value = Number(poolEffort) * Math.pow(2, 31) * 100;
      } else {
          PoolEffort.value = Number(poolEffort) * 100;
      }
      
      if (PoolEffort.value >= 500) {
        //effort4
          effortClass.value = "#FF4500";
      } else if (PoolEffort.value >= 300) {
        //effort3
          effortClass.value = "#FF6347";
      } else if (PoolEffort.value >= 200) {
        //effort2
          effortClass.value = "#FF8C00";
      } else if (PoolEffort.value >= 100) {
        //effort1
          effortClass.value = "#FFA500";
      }
      else {
        //effort0
          effortClass.value = "#50C878";
      }
      console.log('EffortClass value', effortClass)
      return PoolEffort.value
    }
    onMounted(() => {
      //getPools()
      setupCoin(id.value)
      //setupBlocks(id.value)
    })

</script>
<style>
    .statsbox {
        width:13%;
        border-radius: 10px;
        padding:0.5%;
        margin: 1%;
        box-shadow:0 5px 5px rgba(0,0,0,0.5);
        background-color: rgba(252, 10, 30, 0.39);
    }
</style>