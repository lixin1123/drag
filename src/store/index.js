import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    points:[],
    isHorizontalTopSame:false,
    isHorizontalCenterSame:false,
    isHorizontalBottomSame:false,
    isVerticalTopSame:false,
    isVerticalCenterSame:false,
    isVerticalBottomSame:false,
    isHorizontalNear:false,
    isHorizontalCenterNear:false,
    isHorizontalBottomNear:false,
    isVerticalTopNear:false,
    isVerticalCenterNear:false,
    isVerticalBottomNear:false,
    diff:40,
    left:''
  },
  mutations:{
    setPoints(state,value){
      let t=0;
      state.points.forEach((item,index,array)=>{
        if(item.id == value.id){
          array[index] = value
          t=1;
        }
      });  
      if(t==0){state.points.push(value)}  
    },
    isSame(state,value){
      state.isHorizontalTopSame = false;
      state.isHorizontalBottomSame = false;
      state.isHorizontalCenterSame = false;
      state.isVerticalTopSame= false;
      state.isVerticalCenterSame = false;
      state.isVerticalBottomSame = false;
      state.isHorizontalNear = false;
      state.left = 0;
      state.points.forEach((item)=>{
        if(item.id !== value.id){
          if(value.direction.horizontal === 'left'){
            //判断想左移动时，两个div之间的差值，小于diff值的话，让他自动对齐
            if(value.leftLength -  item.left < state.diff && value.leftLength -  item.left > 0){
              state.isHorizontalNear = true;
              state.left =  item.left
            }
            if(value.leftLength -  item.left - item.width/2 < state.diff && value.leftLength -  item.left - item.width/2 > 0){
              state.isHorizontalNear = true;
              state.left =  item.left + item.width/2;
            }
            if(value.leftLength -  item.left - item.width < state.diff && value.leftLength -  item.left - item.width > 0){
              state.isHorizontalNear = true;
              state.left =  item.left + item.width;
            }
            //判断想左移动时，判断第一条竖直线位置是否相等
            if(item.left + item.width ===  value.leftLength){
              state.isVerticalTopSame = true;
            }
            if(item.left + item.width/2 ===  value.leftLength){
              state.isVerticalTopSame = true;
            }
            if(item.left  ===  value.leftLength ){
              state.isVerticalTopSame = true;
            }
            //判断想左移动时，判断第二条竖直线位置是否相等
            if(item.left + item.width ===  value.leftLength + value.width/2 ){
              state.isVerticalCenterSame = true;
            }
            if(item.left + item.width/2 ===  value.leftLength + value.width/2){
              state.isVerticalCenterSame = true;
            }
            if(item.left  ===  value.leftLength + value.width/2 ){
              state.isVerticalCenterSame = true;
            }
            //判断想左移动时，判断第三条竖直线位置是否相等
            if(item.left + item.width ===  value.leftLength + value.width){
              state.isVerticalBottomSame = true;
            }
            if(item.left + item.width/2 ===  value.leftLength + value.width){
              state.isVerticalBottomSame = true;
            }
            if(item.left  ===  value.leftLength + value.width){
              state.isVerticalBottomSame = true;
            }
          }
          if(value.direction.horizontal === 'right'){
            //判断想右移动时，两个div之间的差值，小于diff值的话，让他自动对齐
            //第一条线
            // if(item.left - ){
            //   state.isHorizontalNear = true;
            //   state.left =  item.left
            // }
            if(value.leftLength -  item.left - item.width/2 < state.diff && value.leftLength -  item.left - item.width/2 > 0){
              state.isHorizontalNear = true;
              state.left =  item.left + item.width/2;
            }
            if(value.leftLength -  item.left - item.width < state.diff && value.leftLength -  item.left - item.width > 0){
              state.isHorizontalNear = true;
              state.left =  item.left + item.width;
            }
            if(item.left + item.width ===  value.leftLength){
              state.isVerticalTopSame = true;
            }
            if(item.left + item.width/2 ===  value.leftLength){
              state.isVerticalTopSame = true;
            }
            if(item.left  ===  value.leftLength ){
              state.isVerticalTopSame = true;
            }
            if(item.left + item.width ===  value.leftLength + value.width/2 ){
              state.isVerticalCenterSame = true;
            }
            if(item.left + item.width/2 ===  value.leftLength + value.width/2){
              state.isVerticalCenterSame = true;
            }
            if(item.left  ===  value.leftLength + value.width/2 ){
              state.isVerticalCenterSame = true;
            }
            if(item.left + item.width ===  value.leftLength + value.width){
              state.isVerticalBottomSame = true;
            }
            if(item.left + item.width/2 ===  value.leftLength + value.width){
              state.isVerticalBottomSame = true;
            }
            if(item.left  ===  value.leftLength + value.width){
              state.isVerticalBottomSame = true;
            }
          }
          if(value.direction.vertical === 'top'){
            if(item.top ===  value.topLength){
              state.isHorizontalTopSame = true;
            }
            if(item.top + item.height/2 ===  value.topLength){
              state.isHorizontalTopSame = true;
            }
            if(item.top + item.height ===  value.topLength){
              state.isHorizontalTopSame = true;
            }
            if(item.top ===  value.topLength+ value.height/2){
              state.isHorizontalCenterSame = true;
            }
            if(item.top + item.height/2 ===  value.topLength+ value.height/2){
              state.isHorizontalCenterSame = true;
            }
            if(item.top + item.height ===  value.topLength+ value.height/2){
              state.isHorizontalCenterSame = true;
            }
            if(item.top ===  value.topLength+ value.height){
              state.isHorizontalBottomSame = true;
            }
            if(item.top + item.height/2 ===  value.topLength+ value.height){
              state.isHorizontalBottomSame = true;
            }
            if(item.top + item.height ===  value.topLength+ value.height){
              state.isHorizontalBottomSame = true;
            }
          }
          if(value.direction.vertical === 'bottom'){
            if(item.top ===  value.topLength){
              state.isHorizontalTopSame = true;
            }
            if(item.top + item.height/2 ===  value.topLength){
              state.isHorizontalTopSame = true;
            }
            if(item.top + item.height ===  value.topLength){
              state.isHorizontalTopSame = true;
            }
            if(item.top ===  value.topLength+ value.height/2){
              state.isHorizontalCenterSame = true;
            }
            if(item.top + item.height/2 ===  value.topLength+ value.height/2){
              state.isHorizontalCenterSame = true;
            }
            if(item.top + item.height ===  value.topLength+ value.height/2){
              state.isHorizontalCenterSame = true;
            }
            if(item.top ===  value.topLength+ value.height){
              state.isHorizontalBottomSame = true;
            }
            if(item.top + item.height/2 ===  value.topLength+ value.height){
              state.isHorizontalBottomSame = true;
            }
            if(item.top + item.height ===  value.topLength+ value.height){
              state.isHorizontalBottomSame = true;
            }
          }
        }
      });  
      
    }
  }
})