<template>
  <div>
    <h1 v-text="title"></h1>
    <h2 class="subtitle">Blocks:</h2>
    <div class="table blocks">
      <div class="table-header">
        <div class="table-row">
          <div class="table-column">Height</div>
          <div class="table-column">Age</div>
          <div class="table-column">Txn</div>
          <div class="table-column">Miner</div>
          <div class="table-column">GasUsed</div>
          <div class="table-column">GasLimit</div>
          <div class="table-column">hash</div>
          <div class="table-column">mixHash</div>
          <div class="table-column">nonce</div>
          <div class="table-column">parentHash</div>
          <div class="table-column">receiptsRoot</div>
          <div class="table-column">size</div>
          <!-- <div class="table-column">Uncles</div>
          <div class="table-column">difficulty</div>
          <div class="table-column">extraData</div>
          <div class="table-column">logsBloom</div> 
          <div class="table-column">stateRoot</div>
          <div class="table-column">totalDifficulty</div>
          <div class="table-column">transactionsRoot</div> -->
        </div>
      </div>
      <div v-if="loading || blocks.length" class="table-body" :class="`${loading ? 'table-body-loading' : ''}`">
        <div class="table-row" v-for="(block,i) in blocks" :key="`block-${i}`">
          <div class="table-column" v-text="block.number"></div>
          <div class="table-column" v-text="block.timestamp"></div>
          <div class="table-column" v-text="block.txn"></div>
          <div class="table-column" v-text="block.miner"></div>
          <div class="table-column" v-text="block.gasUsed"></div>
          <div class="table-column" v-text="block.gasLimit"></div>
          <div class="table-column" v-text="block.hash"></div>
          <div class="table-column" v-text="block.mixHash"></div>
          <div class="table-column" v-text="block.nonce"></div>
          <div class="table-column" v-text="block.parentHash"></div>
          <div class="table-column" v-text="block.receiptsRoot"></div>
          <div class="table-column" v-text="block.size"></div>
          <!-- <div class="table-column" v-text="block.sha3Uncles"></div>
          <div class="table-column" v-text="block.difficulty"></div>
          <div class="table-column" v-text="block.extraData"></div>
          <div class="table-column" v-text="block.logsBloom"></div>
          <div class="table-column" v-text="block.stateRoot"></div>
          <div class="table-column" v-text="block.totalDifficulty"></div>
          <div class="table-column" v-text="block.transactionsRoot"></div> -->
        </div>
      </div>
      <div v-else class="table-body-nodata">No data</div>
    </div>

    <br>
    <h2 class="subtitle">Transactions:</h2>
    <div class="table transactions">
      <div class="table-header">
        <div class="table-row">
            <div class="table-column">TxHash</div>
            <div class="table-column">Block Hash</div>
            <div class="table-column">Block Height</div>
            <div class="table-column">TimeStamp</div>
            <div class="table-column">From</div>
            <div class="table-column">To</div>
            <div class="table-column">Value</div>
            <div class="table-column">Gas</div>
            <div class="table-column">GasPrice</div>
            <div class="table-column">Nonce</div>
            <div class="table-column">transactionIndex</div>
            <!-- <div class="table-column">input</div>
            <div class="table-column">r</div>
            <div class="table-column">s</div>
            <div class="table-column">v</div> -->
        </div>
      </div>
      <div v-if="loading || txs.length" class="table-body" :class="`${loading ? 'table-body-loading' : ''}`" >
        <div class="table-row" v-for="(tx,i) in txs" :key="`tx-${i}`">
          <div class="table-column" v-text="tx.hash"></div>
          <div class="table-column" v-text="tx.blockHash"></div>
          <div class="table-column" v-text="tx.blockNumber"></div>
          <div class="table-column" v-text="tx.timestamp"></div>
          <div class="table-column" v-text="tx.from"></div>
          <div class="table-column" v-text="tx.to"></div>
          <div class="table-column" v-text="tx.value"></div>
          <div class="table-column" v-text="tx.gas"></div>
          <div class="table-column" v-text="tx.gasPrice"></div>
          <div class="table-column" v-text="tx.nonce"></div>
          <div class="table-column" v-text="tx.transactionIndex"></div>
          <!-- <div class="table-column" v-text="tx.input"></div>
          <div class="table-column" v-text="tx.r"></div>
          <div class="table-column" v-text="tx.s"></div>
          <div class="table-column" v-text="tx.v"></div> -->
        </div>
      </div>
      <div v-else class="table-body-nodata">No data</div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3';

export default {
  data() {
    return {
      title: 'A Simple Blockchain Browser',
      blocks: [],
      txs: [],
      timmer: null,
      loading: true
    };
  },
  created() {
    if (typeof window.web3 !== 'undefined') {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      const ethNodeUrl = new Web3.providers.HttpProvider('http://localhost:8545'); // TODO: remote URL
      window.web3 = new Web3(ethNodeUrl);
      console.log(window.web3);
    }

    // const { eth } = window.web3;

    // eth.getBlockNumber().then(function(resolve) {
    //   console.log(`getBlockNumber:${resolve}`);
    // });

    // eth.getAccounts().then(function(resolve) {
    //   console.log(`getAccounts:${resolve}`);
    // });

    // eth
    //   .getTransactionCount('0x7900681181e87B926A279769538f5325088eAdc1')
    //   .then(function(resolve) {
    //     console.log(`getTransactionCount:${resolve}`);
    //   });

    // eth.getCoinbase().then(function(resolve) {
    //   console.log(`getCoinbase:${resolve}`);
    // });

    this.refreshData();
    this.timmer = setInterval(() => {
      this.refreshData();
    }, 60000);
  },
  methods: {
    refreshData(){
      try {
        this.printBlocksAndTxs();
      } catch (err) {
        console.log(err);
      }
    },

    async getBlocksAndTxs() {
      const { eth } = window.web3;
      const blockNumber = await eth.getBlockNumber();
      const blocks = [];
      let txs = [];

      for (let i = 1; i <= 10; i++) {
        const block = await eth.getBlock(blockNumber-i);

        block.timestamp = this.$filters.difference(block.timestamp);
        block.txn = block.transactions.length;

        blocks.push(block);
        txs = txs.concat(block.transactions);
      }

      return {
        blocks,
        txs
      };
    },

    async printBlocksAndTxs() {
      const { eth } = window.web3;
      const result = await this.getBlocksAndTxs();

      const txs = result.txs;
      const handledTxs = [];
      
      let len = result.txs.length;
      if (len) {
        for (let i = 1; i < 10; i++) {
          const handledTx = await eth.getTransaction(txs[len-i]);
          
          Object.keys(result.blocks).map(key => {
            if(result.blocks[key].number === handledTx.blockNumber){
              handledTx.timestamp = result.blocks[key].timestamp;
            }
          })
          handledTxs.push(handledTx);
        }
      }

      this.loading = false;
      this.blocks = result.blocks;
      this.txs = handledTxs;
    }
  },
  beforeDestroy(){
    this.timmer && (this.timmer = null);
  }
};
</script>

<style lang="less" scoped>
.subtitle {
  text-align: left;
}

@table-border: 1px solid #ddd;

.table {
  border-top: @table-border;
}
.table-header {
  .table-row {
    background-color: #f9f9f9;
    &:hover {
      background-color: #f9f9f9;
    }
  }
}
.table-body-loading{
  background: url("../assets/loading.gif") center center no-repeat;
  background-size: 20px 20px;
  height: 60px;
  overflow: hidden;
}
.table-body-nodata{
  text-align: center;
  padding: 30px;
}
.table-row {
  display: flex;
  border-bottom: @table-border;
  padding: 12px;
  &:hover {
    background-color: #f2f2f2;
  }
}
.table-column {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>