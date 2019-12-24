
// import './style.less'
import $ from 'jquery/dist/jquery.slim.min.js';
import * as React from 'react';
import extend from 'lodash/extend';

interface TextOverflowOptions {
  str?: string,
  autoUpdate?: boolean,
  trim?: boolean,
  title?: boolean,
  className?: string,
  wholeWord?: boolean
}
interface OverflowWordProps{
  str?: string
  className?: string
}

class OverflowWord extends React.Component<OverflowWordProps> {
  private overflowWord;

  rtrim = (str: string) => {
    return str.replace(/\s+$/g, '');
  }

  getPropertyName = (): 'textContent' | 'data' => {
    const propertyName = document.createTextNode('').textContent ? 'textContent' : 'data';
    return propertyName
  }

  domSplit = (root, maxIndex, options) => {
    let index = 0;
    const result: any = [];
    const domSplitAux = (nodes) => {
      let i = 0;
      let tmp: any = 0;
      let clipIndex = 0;
      const propertyName = this.getPropertyName();

      if (index > maxIndex) {
        return;
      }

      for (i = 0; i < nodes.length; i += 1) {
        if (nodes[i].nodeType === 1) {
          tmp = nodes[i].cloneNode(false);
          result[result.length - 1].appendChild(tmp);
          result.push(tmp);
          domSplitAux(nodes[i].childNodes);
          result.pop();
        } else if (nodes[i].nodeType === 3) {
          if (index + nodes[i].length < maxIndex) {
            result[result.length - 1].appendChild(nodes[i].cloneNode(false));
          } else {
            tmp = nodes[i].cloneNode(false);
            clipIndex = maxIndex - index;
            if (options.wholeWord) {
              clipIndex = Math.min(maxIndex - index, tmp.textContent.substring(0, maxIndex - index).lastIndexOf(' '));
            }
            tmp[propertyName] = options.trim ? this.rtrim(tmp[propertyName].substring(0, clipIndex)) : tmp[propertyName].substring(0, clipIndex);
            result[result.length - 1].appendChild(tmp);
          }
          index += nodes[i].length;
        } else {
          result.appendChild(nodes[i].cloneNode(false));
        }
      }
    };
    result.push(root.cloneNode(false));
    domSplitAux(root.childNodes);
    return $(result.pop().childNodes);
  };

  textOverflow = (options?: TextOverflowOptions) => {
    const o = extend({
      str: '&#x2026;',
      autoUpdate: false,
      trim: true,
      title: false,
      className: undefined,
      wholeWord: false
    }, options);

    let element = $(this.overflowWord);
    const clone = element.clone();
    let originalElement = element.clone();
    const originalText = element.text();
    let originalWidth = element.width();
    let low = 0;
    let mid = 0;
    let high = originalText.length;
    const reflow = () => {

      if (originalWidth !== element.width()) {
        element.replaceWith(originalElement);
        element = originalElement;
        originalElement = element.clone();
        element.textOverflow(extend({}, o, {autoUpdate: false}));
        originalWidth = element.width();
      }
    };

    $(element).after(clone.hide().css({
      'position': 'absolute',
      'width': 'auto',
      'overflow': 'visible',
      'max-width': 'inherit',
      'min-width': 'inherit'
    }));

    if (clone.width() > originalWidth) {
      while (low < high) {
        mid = Math.floor(low + ((high - low) / 2));
        clone.empty().append(this.domSplit(originalElement.get(0), mid, o)).append(o.str);
        if (clone.width() < originalWidth) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }

      if (low < originalText.length) {
        element.empty().append(this.domSplit(originalElement.get(0), low - 1, o)).append(o.str);
        if (o.title) {
          element.attr('title', originalText);
        }
        if (o.className) {
          element.addClass(o.className);
        }
      }
    }
    clone.remove();

    if (o.autoUpdate) {
      setInterval(reflow, 200);
    }
  }

  componentDidMount() {
   this.textOverflow({
     str: this.props.str || '...'
   });
  }

  render() {
    const {className} = this.props;
    return <div ref={ele => this.overflowWord = ele} className={className}>
      {this.props.children}
    </div>
  }
}

export default OverflowWord;
