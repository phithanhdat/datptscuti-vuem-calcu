<template>
  <div class="calculator">
    <!-- <div class="screen">{{ current || 0 }}</div> -->
    <input
      class="screen"
      v-model.lazy="current"
      :style="'font-size: ' + autoSize + 'px; color: ' + autoColor + ';'"
      @change="_onChange"
      @keyup="current = $event.target.value"
    />
    <div class="btn" @click="clear">C</div>
    <div class="btn" @click="sign">+/-</div>
    <div class="btn" @click="percent">%</div>
    <div class="btn operator" @click="opClick('÷')">÷</div>
    <div class="btn" @click="numClick(7)">7</div>
    <div class="btn" @click="numClick(8)">8</div>
    <div class="btn" @click="numClick(9)">9</div>
    <div class="btn operator multiple" @click="opClick('x')">x</div>
    <div class="btn" @click="numClick(4)">4</div>
    <div class="btn" @click="numClick(5)">5</div>
    <div class="btn" @click="numClick(6)">6</div>
    <div class="btn operator" @click="opClick('-')">-</div>
    <div class="btn" @click="numClick(1)">1</div>
    <div class="btn" @click="numClick(2)">2</div>
    <div class="btn" @click="numClick(3)">3</div>
    <div class="btn operator" @click="opClick('+')">+</div>
    <div class="btn delete" @click="backspace">⌫</div>
    <div class="btn" @click="numClick(0)">0</div>
    <div class="btn" @click="numClick('.')">.</div>
    <div class="btn equal" @click="eqClick">=</div>
  </div>
</template>

<script>
// import math from "../utils/computer.js";
import {
  postFixEvaluation,
  infixtoPostfix,
  tokenizer,
  strip,
} from "../utils/computer.js";
// import { Stack } from "../utils/Stack.js";
export default {
  name: "Calculator",

  data() {
    return {
      current: "600",
      isResult: false, // determine the number in current is input val or result after calculate
    };
  },

  computed: {
    autoSize() {
      if (this.current.length < 10) return 60;
      var size = 600 / this.current.length;
      return size;
    },

    autoColor() {
      return this.isResult ? "white" : "#13c5b6";
    },
  },

  methods: {
    clear() {
      this.current = "0";
      this.isResult = false;
    },

    sign() {
      if (this.current === "0") return;
      if (this.current.charAt(0) === "-") {
        this.current = this.current.slice(1);
      } else {
        if (isNaN(this.current)) {
          this.current = `-(${this.current})`;
        } else {
          this.current = `-${this.current}`;
        }
      }
      this.isResult = false
    },

    percent() {
      this.current = `${parseFloat(this.current) / 100}`;
      this.isResult = true;
    },

    _onChange() {
      console.log("on change -->" + this.current);
      //  console.log(this.current);
    },

    numClick(val) {
      if (this.current === "0" || this.isResult) this.current = "";
      this.current = `${this.current}${val}`;
      this.isResult = false;
    },

    opClick(val) {
      if (this.current === "0") return;
      var last = this.current.charAt(this.current.length - 1);
      if (isNaN(last)) {
        this.current = `${this.current.slice(0, -1)}${val}`;
        this.isResult = false;
      } else {
        this.current = `${this.current}${val}`;
        this.isResult = false;
      }
    },

    backspace() {
      if (this.current === "0") return;
      this.current = this.current.slice(0, -1);
    },

    eqClick() {
      var tokens = tokenizer(this.current);
      console.log(tokens);
      var pos = infixtoPostfix(tokens);
      console.log(pos);
      var kq = postFixEvaluation(pos);
      this.current = strip(kq);
      this.isResult = true;
    },
  },

  watch: {
    current: function (newValue, oldValue) {
      console.log("old:" + oldValue);
      console.log("new:" + newValue);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;400&display=swap");

.calculator {
  width: 400px;
  font-size: 60px;
  color: #13c5b6;
  font-family: "Nunito", sans-serif;
  background-color: rgba(53, 61, 78, 255);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
  border-radius: 50px;
}

.screen {
  font-size: 60px;
  font-family: "Nunito", sans-serif;
  color: #13c5b6;
  grid-column: 1 / 5;
  grid-row: 1 / 5;
  font-weight: 400;
  background-color: #353e4e;
  border: 1px solid #00b0a4;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  text-align: right;
  padding-right: 20px;
}

.zero {
  grid-column: 1 / 3;
}

.delete {
  font-size: 40px;
  border-bottom-left-radius: 50px;
}

.equal {
  border-bottom-right-radius: 50px;
}

.btn {
  font-size: 40px;
  font-weight: 200;
  height: 100px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;

  /*No select*/
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.multiple {
  font-size: 35px;
}

.btn:hover {
  background-color: #00b0a459;
  color: white;
}

.btn:active {
  background-color: #b0a400;
  color: white;
}

.operator {
  background-color: rgba(34, 65, 76, 255);
}
</style>
