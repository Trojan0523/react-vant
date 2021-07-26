import React, { CSSProperties, useState, useMemo, useEffect } from 'react';
import classnames from 'classnames';
import { ImageProps } from './PropsType';
import { isDef, addUnit, createNamespace } from '../utils';
import Icon from '../icon';

const [bem] = createNamespace('image');

const Image: React.FC<ImageProps> = (props) => {
  const { fit="fill", errorIcon = 'photo-fail', loadingIcon = 'photo', showError = true, showLoading = true } = props
  const [status, setStatus] = useState({ loading: true, error: false });

  const style = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const style: CSSProperties = {};

    if (isDef(props.width)) {
      style.width = addUnit(props.width);
    }

    if (isDef(props.height)) {
      style.height = addUnit(props.height);
    }

    if (isDef(props.radius)) {
      style.overflow = 'hidden';
      style.borderRadius = addUnit(props.radius);
    }

    return style;
  }, []);

  useEffect(() => {
    setStatus({ error: false, loading: false });
  }, [props.src]);

  const onLoad = () => {
    setStatus(v => ({ ...v,  loading: false}))
  };

  const onError = () => {
    setStatus({ error: true, loading: false })
  };

  const renderLoadingIcon = () => {
    return (
      <Icon
        size={props.iconSize}
        name={loadingIcon}
        className={classnames(bem('loading-icon'))}
        classPrefix={props.iconPrefix}
      />
    );
  };

  const renderErrorIcon = () => {
    return (
      <Icon
        size={props.iconSize}
        name={errorIcon}
        className={classnames(bem('error-icon'))}
        classPrefix={props.iconPrefix}
      />
    );
  };

  const renderPlaceholder = () => {
    if (status.loading && showLoading) {
      return <div className={classnames(bem('loading'))}>{renderLoadingIcon()}</div>;
    }
    if (status.error && showError) {
      return <div className={classnames(bem('error'))}>{renderErrorIcon()}</div>;
    }
    return null;
  };

  const renderImage = () => {
    if (status.error || !props.src) {
      return null;
    }

    const attrs = {
      className: classnames(bem('img')),
      style: {
        objectFit: fit,
      },
    };

    return (
      <img alt={props.alt || 'img'} src={props.src} onLoad={onLoad} onError={onError} {...attrs} />
    );
  };

  return (
    <div className={classnames(bem({ round: props.round }))} style={style}>
      {renderImage()}
      {renderPlaceholder()}
      {props.children}
    </div>
  );
};

export default Image;
