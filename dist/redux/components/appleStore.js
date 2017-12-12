import React,{Component} from 'react'
import { connect } from 'react-redux'  //引入connect方法，设置props属性，将父组件的属性传递
import { bindActionCreators } from 'redux'

import actions from '../actions/appleAction'
import AppleItem from './appleItem'
import '../../styles/appleBasket.scss'

class appleStore extends Component {
	calculateStatus(){  //定义吃掉苹果与未吃掉苹果的初始状态
		let status = {
            appleNow: {
                quantity: 0,
                weight: 0
            },
            appleEaten: {
                quantity: 0,
                weight: 0
            }
        };
        this.props.appleReducer.apples.map(apple=>{
        	let appleState = apple.isEaten? 'appleEaten': 'appleNow'; //判断当前苹果的状态
        	status[appleState].quantity++;  //当晚苹果个数计算
        	status[appleState].weight+= apple.weight; //当前苹果重量计算
        })

        return status; //获取此时view层的数据
	}
    getAppleItem(data){  //页面添加苹果个数
        var arr = [];
        data.map((apple)=>{
            if(!apple.isEaten){
                arr.push(<AppleItem eatApple={this.props.actions.eatApple} key={apple.id} id={apple.id} weight={apple.weight} />)
            }
        })
        return arr;
    }
	render(){
        // console.log(this.props);
		let { appleReducer, actions  } = this.props;  //这里的actions拿到是处理后的action Creates
		let apples = appleReducer.apples;
		let isPicking = appleReducer.isPicking;
		let appleNow = this.calculateStatus().appleNow;
		let appleEaten = this.calculateStatus().appleEaten;
        return (
            <div className="appleBusket">
                <div className="title">苹果篮子</div>

                <div className="stats">
                    <div className="section">
                        <div className="head">当前</div>
                        <div className="content">{appleNow.quantity}个苹果，{appleNow.weight}克
                        </div>
                    </div>
                    <div className="section">
                        <div className="head">已吃掉</div>
                        <div className="content">{appleEaten.quantity}个苹果，{appleEaten.weight}克</div>
                    </div>
                </div>

                <div className="appleList">
                    {this.getAppleItem(apples)}
                </div>

                <div className="btn-div">
                    <button  className={isPicking ? 'disabled' : ''}  onClick={actions.pickApple} >摘苹果</button>
                {/*从理论来讲，当用户操作view层发出action后，如何触发reducer?,有一种做法是监听dispatch,采用手动subscribe的方法重置reducer,
                另一种是在reducer中深度copy一份state，修改完后return，redux检测到新的状态会更新view层*/}
                </div>
            </div>
        );
	}

}

// let mapStateToProps = state => ({
// 	appleReducer: state.appleReducer,
//     // testReducer: state.testReducer
// })

// let getAppleDispatch = dispatch => ({
//     actions: bindActionCreators(actions,dispatch)
// })

let mapStateToProps = state => {
    console.log(state);
    return {
        appleReducer: state.appleReducer
    } 
}
let getAppleDispatch = dispatch => {
    console.log(dispatch);
    return {
        actions: bindActionCreators(actions,dispatch)
    }
}

export default connect(mapStateToProps,getAppleDispatch)(appleStore)  //通过connect,将store中的状态放入react的this.props中