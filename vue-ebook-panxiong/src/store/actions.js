const actions = {
  setFileName: ({ commit }, fileName) => {
    return commit('SET_FILENAME', fileName) //异步调用
  },
  setMenuVisitor: ({ commit }, menuVisitor) => {
    return commit('SET_MENUVISITOR', menuVisitor) //异步调用
  }
};

export default actions
