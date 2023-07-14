import React from "react";
import styled from "styled-components/macro";

const Div = styled.div`
  display: flex;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  justify-self: ${(props) => props.justify_s};
  align-items: ${(props) => props.align};
  align-self: ${(props) => props.align_s};
  gap: ${(props) => props.gap}px;
  margin: ${(props) => `${props.m_top}px ${props.m_right}px ${props.m_bottom}px ${props.m_left}px`};
  position: ${(props) => props.position};
  top: ${(props) => props.top}px;
  right: ${(props) => props.right}px;
  bottom: ${(props) => props.bottom}px;
  left: ${(props) => props.left}px;
  z-index: ${(props) => props.zindex};
  padding: ${(props) => `${props.p_top}px ${props.p_right}px ${props.p_bottom}px ${props.p_left}px`};
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.border_radius};
  background: ${(props) => props.background};
  box-shadow: ${(props) => props.box_shadow};
  font-size: ${(props) => props.f_size};
  line-height: ${(props) => props.line_height};
  letter-spacing: ${(props) => props.letter_spacing};
  overflow-x: ${(props) => props.overflow_x};
  overflow-y: ${(props) => props.overflow_y};
`;

export default function Flex(props) {
  const {
    render,
    ...restProps
  } = props;

  return <Div {...restProps}>{render}</Div>;
}
