function Demo (props) {
  return (
      <>
          <h4>Demo</h4>
          <a href="/demo/test">Demo1</a>&nbsp;
          <a href="/demo/test/123">Demo2</a>
          <p></p>
          {props.view(props)}
      </>
  )
}

Demo.loadData = ctx => {
  console.log('get layout data')
  return { aaa: [1, 2, 3] }
}

export default Demo
