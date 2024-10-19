<template>
    
  <div class="container">
    <div class="row justify-content-center info-box bg-yellow-gradient" v-if="pool">
        <h4>Information about {{pool.coin.name}}</h4>
        <div class="col-auto connect-info-box">
            <h6><b>Coin:</b></h6>
            <h6>{{ pool.coin.name }}</h6>
        </div>
        <div class="col-auto connect-info-box">
            <h6><b>Algo:</b></h6>
            <h6>{{ pool.coin.algorithm }}</h6>
        </div>
        <div class="col-auto connect-info-box" v-if="pool.coin.website">
            <h6><b>Website:</b></h6>
            <span>
                <a :href="pool.coin.website"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600v-80h160v-480H200v480h160v80H200Zm240 0v-246l-64 64-56-58 160-160 160 160-56 58-64-64v246h-80Z"/></svg></a>{{ pool.coin.website.replace('https://', "") }}
            </span>
        </div>
        <div class="col-auto connect-info-box" v-if="pool.coin.github">
            <h6><b>Github:</b></h6>
            <span>
                <a :href="pool.coin.github"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600v-80h160v-480H200v480h160v80H200Zm240 0v-246l-64 64-56-58 160-160 160 160-56 58-64-64v246h-80Z"/></svg></a>{{ pool.coin.github.replace('https://' , "") }}
            </span>
        </div>
        <div class="col-auto connect-info-box">
            <h6><b>Payout Scheme:</b></h6>
            <h6>{{ pool.paymentProcessing.payoutScheme }}</h6>
        </div>
        <div class="col-auto connect-info-box">
            <h6><b>Pool Fee:</b></h6>
            <h6>{{pool.poolFeePercent}}%</h6>
        </div>
        <hr>
        <div class="row justify-content-center">
            <h4>Choose stratum:</h4>
            <div class="col-auto connect-stratum-box">
                <h6><b>Select region:</b></h6>
                <select v-model="selectedRegion">
                    <option>Europe</option>
                    <option>North America</option>
                </select>
            </div>
            <div class="col-auto connect-stratum-box">
                <h6><b>Select port:</b></h6>
                <select v-model="selectedPort">
                    <option v-for="(value, id) in pool.ports" :key="id" :value="id">{{value.name}} - VarDiff: {{ value.varDiff.minDiff }} &harr; &infin;</option>
                </select>
            </div>
            <div class="col-auto connect-stratum-box">
                <h6><b>Select OS:</b></h6>
                <select v-model="selectedOS">
                    <option>HiveOS</option>
                    <option>Windows</option>
                </select>
            </div>
        </div>
        <hr>
        <div class="row justify-content-center">
            <h4>Stratum address:</h4>
            <span class="codeCardCenter">
                <h4>stratum+tcp://{{ stratumPrefix }}.flazzard.com:{{selectedPort}}
                    <button @click="copyMe(stratumPrefix, selectedPort)" style="background-color: transparent; padding: 0px; border:0px">
                    <img src="@/assets/img/copy.png" style="height: 25px; width: 25px;"></button></h4>   
            </span>
        </div>
    </div>
    <div class="row justify-content-center info-box bg-yellow-gradient" style="padding:2%" v-if="pool">
        <h4>Getting started:</h4>
        <div class="col-auto connect-background" style="padding:1%">
            <h5>Requirements:</h5>
            <div class="col-auto connect-info-box" style="margin:5%">
                <h6>{{ pool.coin.name }} Wallet address</h6>
            </div>
            <div class="col-auto connect-info-box" style="margin:5%">
                <h6>Mining software for {{ pool.coin.algorithm }}</h6>
            </div>
            <div class="col-auto connect-info-box" style="margin:5%">
                <h6>Compatible hardware</h6>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-auto connect-background">
                <h5>Getting wallet address:</h5>
                <hr>
                Build wallet from source, or if available you can download a wallet directly from Reaction website or github.
                Follow the instruction on the Github to complete install, if you get stuck don't hesistate to either ask us or in the discord of Reaction
                Please consider installing the wallet on a virtual machine unless you trust the project completely.
                Warning: mining directly to an exchange is not recommended!
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-auto connect-background" v-if="selectedOS == 'HiveOS'">
                <h5>HiveOS config suggestions:</h5>
                <hr>
                <div class="col-auto hiveoOS-wallet">
                    <h6>Add wallet in HiveOS</h6>
                    <img class="config-image" :src="require(`./../assets/img/HiveOS/Hiveos_Wallet1.webp`)" style="width:94%">
                    <div class="codeCardCenter" style="margin-top:1%; margin-bottom:5%;">While on your <span class="blue-color">Hiveos Farm</span>, select <span class="green-color">Wallets</span> and click <span class="red-color">Add Wallet</span></div>
                    <div class="row main-row-3">    
                        <div class="col-6">
                            <img class="config-image" :src="require(`./../assets/img/HiveOS/Hiveos_Wallet.png`)">
                        </div>
                        <div class="col-6">
                          <br>
                            <div class="codeCardCenter" style="margin-top:8%; margin-bottom:5%">
                                Search for <span class="green-color">{{ pool.coin.symbol }}</span> or <span class="red-color">add it</span> if it doesn't exist.
                            </div>
                            <div class="codeCardCenter" style="margin-bottom:5%">
                                Input <span class="green-color">wallet-address</span> for <span class="blue-color">{{ pool.coin.name }}</span>
                            </div>
                            <div class="codeCardCenter" style="margin-bottom:5%">
                              Choose a <span class="green-color">name</span> for your wallet.
                            </div>
                            <div class="codeCardCenter" style="margin-bottom:32%">
                              <span class="blue-color">Optional:</span> feel free to leave <span class="green-color">blank.</span>
                            </div>
                            <div class="codeCardCenter">
                              Press <span class="red-color">Create</span> to save wallet.
                            </div>
                           
                        </div>
                        </div>
                </div>
            </div>
        </div>
        
    </div>
    <div class="row justify-content-center">
      <div class="col-auto" v-if="pool">

                  
              <div class="info-box bg-yellow-gradient">
                  <span class="info-box-text">
                      <h3>Miner Configuration</h3>
                      <h2>Getting started</h2>
                      <hr />
                      <table style="margin:auto">
                          <h5>Requirements:</h5>
                          <ul>
                              <li>{{ pool.coin.name }} Wallet address. </li>
                              <li>Mining software for {{ pool.coin.algorithm }}</li>
                              <li>Compatible hardware</li>
                          </ul>        
                      </table>
                      <h5>Getting a wallet address:</h5>
                      <div v-if="pool.coin.github && pool.coin.family == 'kaspa'">
                          Build wallet from source, or if available you can download a wallet directly from <a :href="pool.coin.github" target="_blank">Github</a>
                          <br> Follow the instruction on the Github to complete install, if you get stuck don't hesistate to either ask us or in the discord of {{ pool.coin.name }}
                          <br> Please consider installing the wallet on a virtual machine unless you trust the project completely.
                          <br> Warning: mining directly to an exchange is not recommended!
                      </div>
                      <div v-else-if="pool.coin.family == 'kaspa'">
                          Build wallet from source, or if available you can download a wallet directly from {{ pool.coin.name }} website or github.
                          <br> Follow the instruction on the Github to complete install, if you get stuck don't hesistate to either ask us or in the discord of {{ pool.coin.name }}
                          <br> Please consider installing the wallet on a virtual machine unless you trust the project completely.
                          <br> Warning: mining directly to an exchange is not recommended!
                      </div>
                      <div v-else-if="pool.coin.family != 'kaspa'">
                          Build wallet from source, or if available you can download a wallet directly from {{ pool.coin.name }} website or github.
                          <br> Follow the instruction on the Github to complete install, if you get stuck don't hesistate to either ask us or in the discord of {{ pool.coin.name }}
                          <br> Please consider installing the wallet on a virtual machine unless you trust the project completely.
                          <br> Warning: mining directly to an exchange is not recommended!
                      </div>
                      <hr>
                      <h4>Miner Config</h4>
                      <hr>
                      <div v-if="selectedOS == 'HiveOS'"><h5><u>HiveOS Config suggestions</u></h5>
                        <div class="row main-row-2">
                            <h5 style="margin-top:5%; margin-bottom:2%">Add wallet in HiveOS</h5>
                        </div>
                        <div class="col-6">
                            <img class="config-image" :src="require(`./../assets/img/HiveOS/Hiveos_Wallet1.webp`)" style="width:94%">
                            <div class="codeCardCenter" style="margin-top:1%; margin-bottom:5%;">While on your <span class="blue-color">Hiveos Farm</span>, select <span class="green-color">Wallets</span> and click <span class="red-color">Add Wallet</span></div>
                        </div>
                        <div class="row main-row-3">    
                            <div class="col-6">
                                <img class="config-image" :src="require(`./../assets/img/HiveOS/Hiveos_Wallet.png`)">
                            </div>
                            <div class="col-6">
                              <br>
                                <div class="codeCardCenter" style="margin-top:8%; margin-bottom:5%">
                                    Search for <span class="green-color">{{ pool.coin.symbol }}</span> or <span class="red-color">add it</span> if it doesn't exist.
                                </div>
                                <div class="codeCardCenter" style="margin-bottom:5%">
                                    Input <span class="green-color">wallet-address</span> for <span class="blue-color">{{ pool.coin.name }}</span>
                                </div>
                                <div class="codeCardCenter" style="margin-bottom:5%">
                                  Choose a <span class="green-color">name</span> for your wallet.
                                </div>
                                <div class="codeCardCenter" style="margin-bottom:32%">
                                  <span class="blue-color">Optional:</span> feel free to leave <span class="green-color">blank.</span>
                                </div>
                                <div class="codeCardCenter">
                                  Press <span class="red-color">Create</span> to save wallet.
                                </div>
                               
                            </div>
                        </div>
                          <div class="row">
                            <h5 style="margin-top:5%; margin-bottom:3%;">Create FlightSheet</h5>
                                <div class="parent-column col-auto">
                                    <div class="text-parent">
                                        <div class="coin-column text-position codeCardCenter">
                                            Add <span class="green-color">{{pool.coin.symbol}}</span><br><span class="blue-color">-coin</span>
                                        </div>
                                        <div class="wallet-column text-position codeCardCenter">
                                            Add <span class="green-color">{{pool.coin.symbol}}</span><br><span class="blue-color">-wallet</span>
                                        </div>
                                        <div class="pool-column text-position codeCardCenter">
                                            <span class="green-color">Configure<br> in miner</span>
                                        </div>
                                        <div class="miner-column text-position codeCardCenter">
                                            Select<br> <span class="green-color">{{ minerName }}</span>
                                        </div>
                                    </div>    
                                    <div class="image-container">
                                        <div>
                                            <img class="cardFlightsheet" :src="require(`./../assets/img/HiveOS/Hiveos_${pool.coin.algorithm}1.png`)">
                                        </div>                
                                        <div class="codeCardCenter" style="margin-top:1%">
                                            Choose a <span class="green-color">name</span> and press <span class="red-color">update</span>
                                        </div>
                                    </div>
                                    
                                </div>

                          </div>
                          
                          <div class="row main-row-2" style="margin-top:5%; margin-bottom:3%;">
                              <h5>Setup miner config</h5>
                          </div>
                          
                          <div class="row main-row-3" v-bind="setMiner(pool.coin.algorithm)">    
                              <div class="col-6">
                                  <img class="config-image" :src="require(`./../assets/img/HiveOS/Hiveos_${pool.coin.algorithm}2.png`)">
                              </div>
                              <div class="col-6">
                                <br>
                                  <div class="codeCardCenter" style="margin-bottom:10%" v-if="pool.coin.algorithm == 'Karlsenhash'">
                                    We recommend <span class="green-color">{{ minerName }}</span> for <span class="blue-color">{{ pool.coin.name }}</span>
                                  </div>
                                  <div class="codeCardCenter" style="margin-bottom:13%" v-if="pool.coin.algorithm == 'KawPow'">
                                    We recommend {{ minerName }} for this coin.
                                  </div>
                                  <div class="codeCardCenter" style="margin-bottom:2%">
                                      Select <span class="green-color">{{ minerAlgo }}</span>
                                  </div>
                                  <div class="codeCardCenter" style="margin-bottom:2%" v-if="pool.coin.algorithm == 'Karlsenhash'">
                                    Input <span class="green-color">%WAL%</span> to use your <span class="blue-color">HiveOS-wallet.</span>
                                  </div>
                                  <div class="codeCardCenter" style="margin-bottom:8%" v-if="pool.coin.algorithm == 'KawPow'">
                                    Input %WAL% to use your HiveOS wallet.
                                  </div>
                                  <div class="codeCardCenter" style="margin-bottom:2%" v-if="pool.coin.algorithm == 'Karlsenhash'">
                                    Input <span class="green-color">%WORKER_NAME%</span> to display workername
                                    <br>
                                    Pass: input <span class="green-color">x</span> for default or <span class="green-color">d=</span><span class="red-color">xxxx</span> for <span class="blue-color">static difficulty</span><br>
                                      (replace <span class="red-color">xxxx</span> with <span class="green-color">desired difficulty)</span>
                                  </div>
                                  <div class="codeCardCenter" style="margin-bottom:12%" v-if="pool.coin.algorithm == 'KawPow'">
                                    Write %WORKER_NAME% to display workername
                                    <br>
                                    Pass: x or empty, input d=xxxx for static diff<br>
                                      (replace xxxx with desired difficulty)
                                  </div>
                                  <div class="codeCardCenter" style="margin-bottom:10%" v-if="pool.coin.algorithm == 'Karlsenhash'">
                                    <span class="green-color">stratum+tcp://{{ stratumPrefix }}.flazzard.com:{{selectedPort}}</span>&nbsp;
                                    <button @click="copyMe(stratumPrefix, selectedPort)" style="background-color: transparent; padding: 0px; border:0px;">
                                        <img src="@/assets/img/copy.png" style="height: 25px; width: 25px;">
                                    </button>
                                  </div>
                                  <div class="codeCardCenter" style="margin-bottom:18%" v-if="pool.coin.algorithm == 'KawPow'">
                                    Add pool from above.
                                  </div>
                                  <div class="codeCardCenter" style="margin-bottom:11%" v-if="pool.coin.algorithm == 'Karlsenhash'">
                                    <span class="blue-color">Optional:</span> here we're dualmining zil, <br>theres also some <span class="red-color">OC Settings.</span>
                                  </div>
                                  <div class="codeCardCenter" style="margin-bottom:32%" v-if="pool.coin.algorithm == 'KawPow'">
                                    <span class="green-color">Optional:</span> here we're dualmining zil, <br>theres also some <span class="red-color">OC Settings.</span>
                                  </div>
                                  <div class="codeCardCenter">
                                    Press <span class="green-color">Apply Changes</span> to save.
                                  </div>
                                 
                              </div>
                          </div>
                          <!--
                          <table v-if="pool.coin.algorithm == 'Ghostrider'">
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/Ghostrider_top.webp" style="width:450px;"></td>
                                  <th>We recommend XMRIG(new) for this coin.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px;"><img src="./../assets/img/HiveOS/Ghostrider_algo.webp" style="width:450px;"></td>
                                  <th>Search and select Ghostrider(RTM).</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/Ghostrider_pool.webp" style="width:450px;"></td>
                                  <th v-if="selectedRegion == 'Europe'">Add pool: stratum+tcp://eu.flazzard.com:{{ selectedPort }} 
                                      <button @click="copyMe('eu', selectedPort)" style="background-color: transparent; padding: 0px;">
                                          <img src="@/assets/img/copy.png" style="height: 25px; width: 25px;">
                                      </button>
                                  </th>
                                  <th v-if="selectedRegion == 'North America'">Add pool: stratum+tcp://na.flazzard.com:{{ selectedPort }} 
                                      <button @click="copyMe('na', selectedPort)" style="background-color: transparent; padding: 0px;">
                                          <img src="@/assets/img/copy.png" style="height: 25px; width: 25px;">
                                      </button>
                                  </th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/Ghostrider_hugePages.webp" style="width:450px;"></td>
                                  <th>Set CPU hugepages to 1248.</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/Ghostrider_cpuConfig.webp" style="width:450px;"></td>
                                  <th>"cpu": {
                                      "ghostrider": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
                                      <br> 
                                      "huge-pages": true,
                                      <br>
                                      "hw-aes": null,
                                      <br>
                                      "priority": null,
                                      <br>
                                      "memory-pool": false,
                                      <br>
                                      "asm": true
                                     }</th>
                              </tr>
                              <tr>
                                  <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/Ghostrider_bottom.webp" style="width:450px;"></td>
                                  <th>Press Apply changes</th>
                              </tr>
                          </table>
                          -->
                      </div>
                      <div v-else-if="selectedOS == 'Windows'">Windows config suggestions:
                          <div v-bind="setMiner(pool.coin.algorithm)">
                              For {{ pool.coin.name }} we recommend {{ minerName }} <a :href="minerLink" target="_blank">[Download here]</a>
                              <br> Choose the latest version and download to your PC / Miningrig
                              <div v-if="pool.coin.algorithm == 'KawPow'">
                                  <hr>
                                  Either edit aipg.bat or make a new batfile inside the {{ minerName }} folder with this text:
                                  <hr>
                                  <div class="codeCardLeft">
                                  @echo off<br>
                                  cd /d %~dp0<br>
                                  bzminer -a gamepass -w WALLET_ADDRESS -p stratum+tcp://{{ stratumPrefix }}.flazzard.com:{{selectedPort}} --nc 1
                                  <br>
                                  pause
                                  </div>
                              </div>
                              <div v-if="pool.coin.algorithm == 'Karlsenhash'">
                                  <hr>
                                  Either edit kls.bat or make a new batfile inside the {{ minerName }} folder with this text:
                                  <hr>
                                  <div class="codeCardLeft">
                                  @echo off<br>
                                  cd /d %~dp0<br>
                                  rigel.exe -a karlsenhash -o stratum+tcp://{{ stratumPrefix }}.flazzard.com:{{selectedPort}} -u YOUR_KLS_WALLET -w my_rig --log-file
                                  <br>
                                  pause
                                  </div>
                              </div>
                              <div v-if="pool.coin.algorithm == 'kHeavyHash'">
                                  <hr>
                                  There doesnt appear to be a file for Kaspa in the {{ minerName }} folder,<br> so create one named kaspa.bat in the {{ minerName }} folder.
                                  <hr>
                                  <div class="codeCardLeft">
                                  @echo off<br>
                                  cd /d %~dp0<br>
                                  bzminer -a kaspa -w WALLET_ADDRESS -p stratum+tcp://{{ stratumPrefix }}.flazzard.com:{{selectedPort}} --nc 1
                                  <br>
                                  pause
                                  </div>
                              </div>
                              <div v-if="pool.coin.algorithm == 'Pyrin'">
                                  <hr>
                                  Either edit pyi.bat or make a new batfile inside the {{ minerName }} folder with this text:
                                  <hr>
                                  <div class="codeCardLeft">
                                  @echo off<br>
                                  cd /d %~dp0<br>
                                  rigel.exe -a pyrinhash -o stratum+tcp://{{ stratumPrefix }}.flazzard.com:{{selectedPort}} -u YOUR_KLS_WALLET -w my_rig --log-file
                                  <br>
                                  pause
                                  </div>
                              </div>
                              Then save the batfile and double click to run it.<br>
                              Check out the miner's github for more commands.
                          </div>
                      </div>
                      <div v-else>[Miner OS unselected] please select from dropdown above</div>
                  </span>
              </div>
          </div>
    </div>
  </div>

</template>
  
<script setup lang="ts">
import {ref, watch, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {Pool} from '@/definitions/pool.model'
import {getCoin} from '@/services/getCoin'

const pool = ref<Pool>();
const route = useRoute();
const id = ref(route.params.id);
const selectedRegion = ref("Europe");
const selectedPort = ref("");
const selectedOS = ref("HiveOS");
const minerName = ref("");
const minerLink = ref("");
const minerAlgo = ref("");
const configImage = ref("");
const stratumPrefix = ref("");

async function setupCoin(coinId) {
    pool.value = await getCoin(coinId)
    selectedPort.value = Object.keys(pool.value.ports)[0]
    if(selectedRegion.value == 'Europe'){
            stratumPrefix.value = 'eu'
        }else if(selectedRegion.value == 'North America'){
            stratumPrefix.value = 'na'
        }
    
}
/*
function getPools() {
    axios
    .get('https://pool.flazzard.com/api/pools/' + id.value)
    .then((response) => {
        pools.value =response.data
        console.log("Returned Pools: ", response.data)
        selectedPort.value = Object.keys(pools.value.pool.ports)[0]
    })
    .catch((error) => {
        console.warn("getPools error: ", error)
    }) 
}
    */
function setMiner(algorithm:string){
    if (algorithm == 'kHeavyHash'){
        minerName.value = 'Bzminer'
        minerLink.value = 'https://github.com/bzminer/bzminer/releases'
        minerAlgo.value = 'kaspa'
        configImage.value = './../assets/img/Hiveos_KHeavyHash2.png'
    }
    if(algorithm == 'Karlsenhash'){
        minerName.value = 'Rigel Miner'
        minerLink.value = 'https://github.com/rigelminer/rigel/releases'
        minerAlgo.value = 'karlsenhash'
        configImage.value = './../assets/img/Hiveos_Karlsen2.png'
    }
    if(algorithm == 'KawPow'){
        minerName.value = 'BzMiner'
        minerLink.value = 'https://github.com/bzminer/bzminer/releases'
        minerAlgo.value = 'kawpow'
        configImage.value = './../assets/img/Hiveos_KawPow2.png'
    }
    if(algorithm == 'Ghostrider'){
        minerName.value = 'XMRig(new)'
        minerLink.value = 'https://github.com/xmrig/xmrig/releases'
        minerAlgo.value = 'Ghostrider(RTM)'
        configImage.value = `./../assets/img/Hiveos_GR2.png`
    }
}
watch(selectedRegion,(newValue,oldValue) => { 
    if(newValue != oldValue) {
        if(selectedRegion.value == 'Europe'){
            stratumPrefix.value = 'eu'
        }else if(selectedRegion.value == 'North America'){
            stratumPrefix.value = 'na'
        }
        
    }});
function copyMe(region:string,port:string){
  navigator.clipboard.writeText('stratum+tcp://' + region + '.flazzard.com:' + port);
}
onMounted(() => {
    setupCoin(id.value)
    })
  </script>
<style>
.parent-column {
    position: relative;
    width: 500px;
}

.text-parent {
    height: 50px;
}

.text-position {
    position: absolute;
}

.coin-column {
    left: 9%;
    top: -3%;
}

.wallet-column {
    left: 31%;
    top: -3%;
}

.pool-column {
    left: 53%;
    top: -3%;
}

.miner-column {
    left: 78%;
    top: -3%;
}

.cardFlightsheet {
    width: 100%;
    max-width: 500px;
}
.config-image {
    width: 100%;
    max-width: 500px;
}
.codeCardLeft {
    background-color: rgba(10, 23, 63, 0.911);
    border: 1px solid;
    border-radius: 10px;
    border-color: #f5f3f9;
    text-align: left;
    padding: 5px;
    
}
.codeCardCenter {
    background-color: rgba(10, 23, 63, 0.911);
    border: 1px solid;
    border-radius: 10px;
    border-color: #f5f3f9;
    text-align: center;
    padding: 5px;
    width:fit-content;
    
}
.green-color {
    color: greenyellow;
    font-weight: 600;
}
.blue-color {
    color:cornflowerblue;
    font-weight: 600;
}
.red-color {
    color: rgb(250, 95, 95);
    font-weight: 600;
}
.connect-info-box {
    width:fit-content;
    border-radius: 10px;
    padding:0.5%;
    margin: 1%;
    box-shadow:0 5px 5px rgba(0,0,0,0.5);
    background-color: rgba(252, 10, 30, 0.39);
}
.connect-stratum-box {
    width:fit-content;
    border-radius: 10px;
    padding:0.5%;
    margin: 1%;
    box-shadow:0 5px 5px rgba(0,0,0,0.5);
    background-color: rgba(10, 252, 26, 0.39);
}
.connect-background {
    background-color: rgb(156, 115, 122);
    width:fit-content;
    border-radius: 10px;
    padding:5%;
    margin: 1%;
    box-shadow:0 5px 5px rgba(0,0,0,0.5);
}
.hiveoOS-wallet {
    background-color: rgb(110, 56, 65);
    width:fit-content;
    border-radius: 10px;
    padding:5%;
    margin: 1%;
    box-shadow:0 5px 5px rgba(0,0,0,0.5);
}
</style>