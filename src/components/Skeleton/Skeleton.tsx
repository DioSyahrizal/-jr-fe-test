import React from 'react';
import classnames from 'classnames';
import styled, { keyframes } from 'styled-components';

import { variables } from '@kata-kit/theme';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
  numberOfLines?: number;
  small?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, numberOfLines, small }) => {
  if (numberOfLines && numberOfLines > 1) {
    return (
      <Multiline>
        {[...Array(numberOfLines)].map((_, i) => (
          <Wrapper key={i} className={classnames(className, small && 'is-small')} />
        ))}
      </Multiline>
    );
  }

  return <Wrapper className={classnames(className, small && 'is-small')} />;
};

Skeleton.defaultProps = {
  numberOfLines: 1
};

const Wrapper = styled('div')`
  display: block;
  position: relative;
  overflow: hidden;
  height: 20px;
  width: 100%;
  background: ${variables.colors.gray20};
  border-radius: 4px;

  &.is-small {
    height: 16px !important;
  }
`;

const Multiline = styled('div')`
  ${Wrapper} {
    margin-bottom: ${variables.spaces.space1};

    &:last-child {
      width: 65%;
    }
  }
`;
