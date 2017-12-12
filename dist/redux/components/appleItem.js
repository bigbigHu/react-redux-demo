import React,{Component} from 'react'
import { connect } from 'react-redux'
import '../../styles/appleItem.scss'
export default class appleItem extends Component {
	render(){
		
		let {eatApple} = this.props
		return(
			<div className="appleItem">
                <div className="info">
                    <div className="name">红苹果 - {this.props.id}号</div>
                    <div className="weight">{ this.props.weight }克</div>
                </div>
                <div className="btn-div">
                    <button onClick={eatApple.bind(null, this.props.id)}> 吃掉 </button>
                </div>
            </div>
		)
	}
}
// appleItem.propTypes = {
//     eatApple: React.PropTypes.func.isRequired,   // 吃苹果的回调，已通过bindActionCreators包装成dispatch(action)
//     // apple: React.PropTypes.object.isRequired     // 单个苹果的数据
// };

// export default connect()(appleItem)