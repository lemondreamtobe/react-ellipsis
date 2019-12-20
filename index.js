
// import './style.less'
import OverFlow from './overflow'; 
import $ from 'jquery/dist/jquery.slim.min.js';

class OverflowWord extends React.Component {
  componentDidMount() {
    $(this.overflowWord).textOverflow();
  }

  render() {
    const { className } = this.props;
    return <div ref={ele => this.overflowWord = ele} className={className}>
      {this.props.children}
    </div>
  }
}

export default OverflowWord;
