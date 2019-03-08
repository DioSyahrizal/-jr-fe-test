import styled from 'styled-components';
import { variables } from '@kata-kit/theme';

export const CardInfo = styled('div')`
  display: flex;
  height: 24px;
  line-height: 1.9;
  border-width: 1px;
  border-style: solid;
  border-color: ${variables.colors.gray30};
  border-radius: 2px;

  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

export const CardInfoKey = styled('div')`
  width: 148px;
  font-size: 13px;
  color: ${variables.colors.gray50};
  background-color: ${variables.colors.gray10};
  padding: 0px 8px;
  border-right: 1px solid ${variables.colors.gray30};
`;

export const CardInfoValue = styled('div')`
  flex: 1 1 auto;
  font-size: 13px;
  padding-left: 8px;
  color: ${variables.colors.gray70};
`;
