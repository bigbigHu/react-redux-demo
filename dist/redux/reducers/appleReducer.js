
const initialState = {   //苹果的初始数量
    isPicking: false,
    newAppleId: 3,
    apples: [
        {
            id: 0,
            weight: 233,
            isEaten: false
        },
        {
            id: 1,
            weight: 235,
            isEaten: true
        },
        {
            id: 2,
            weight: 256,
            isEaten: false
        }
    ]
};


export default (state = initialState, action) => {

    let newState = Object.assign({}, state);  

    switch (action.type) {

        case 'apple/BEGIN_PICK_APPLE':

            /** 将isPicking设置true */
            
            newState.isPicking = true;
            return newState;
            // return fromJS(state).set('isPicking', true).toJS();

        case 'apple/DONE_PICK_APPLE':

            let newApple =  {
                id: state.newAppleId,
                weight: action.payload,
                isEaten: false
            };

            //将摘下的苹果加入数组中
            newState.apples.push(newApple);
            newState.isPicking = false;
            newState.newAppleId++;
            return newState;
            /** 在apples中新增一个newApple， 将newAppleId增加1， 将isPicking设为false*/
            // return fromJS(state).update('apples', list => list.push(newApple))
            //                     .set('newAppleId', state.newAppleId + 1)
            //                     .set('isPicking', false)
            //                     .toJS();

        case 'apple/FAIL_PICK_APPLE':

            /** 将isPicking设置false */
            newState.isPicking = false;
            return newState
            // return fromJS(state).set('isPicking', false).toJS();

        case 'apple/EAT_APPLE':

            /** 将id对应索引值的数组的isEaten设为true,表示已吃*/
            let appleArr = newState.apples;
            appleArr.map(apple=>{
                if(apple.id == action.payload){
                    apple.isEaten = true;
                    return;
                }
            })
            return newState;
            // return fromJS(state).setIn(['apples', action.payload, 'isEaten'], true).toJS();

        default:
            return state;
    }
}