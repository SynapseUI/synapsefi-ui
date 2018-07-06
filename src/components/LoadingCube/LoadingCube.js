import React from 'react';
import styled, { css, keyframes } from 'styled-components';
// import { baseLoadingCubeStyling } from '../styles/loadingCube.styles';
import Color from 'color';

const fill = props => `
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
`;

const Box = styled.div`
  ${fill}
  width: 3em;
  height: 2em;
  margin: 41vmin auto;
  font-size: 50px;
  transform-style: preserve-3d;
  transform: rotateX(60deg) rotateZ(45deg);
  &:active * { animation-play-state: running; }
  &:before {
    border-top-color: 'black';
  }`


const move = keyframes`
0%,
87.5%,
100%  { transform: translate(1em, 0em); }
12.5% { transform: translate(2em, 0em); }
25%   { transform: translate(2em, 1em); }
37.5%,
50%   { transform: translate(1em, 1em); }
62.5% { transform: translate(0em, 1em); }
75%   { transform: translate(0em, 0em); }`

const Cube = styled.div`
animation: ${move} 3s ease-in-out infinite;
position: absolute;
width: 1em;
height: 1em;
background: ${props => props.colorLight};
transform-style: preserve-3d;
animation-delay: ${props => 3 * (props.index / 4 - 4)}s;
box-shadow: 5em 5em .3em .1em #DBDBDB;
&::before,
&::after {
  content: '';
  ${fill};
}
&::before {
  background-color: ${props => props.colorDark};
  transform-origin: 100% 100%;
  transform: rotateY(-90deg);
}

&::after {
  background-color: ${props => props.color};
  transform-origin: 0% 100%;
  transform: rotateX(90deg);
}`


const LoadingCube = (props) => {
  const color = Color(props.color);
  const light = color.lighten(0.3).hsl().string();
  const dark = color.darken(0.4).hsl().string();
  return (<Box className="box center">
    <Cube className="cube" color={props.color} colorLight={light} colorDark={dark} index={1} />
    <Cube className="cube" color={props.color} colorLight={light} colorDark={dark} index={2} />
    <Cube className="cube" color={props.color} colorLight={light} colorDark={dark} index={3} />
    <Cube className="cube" color={props.color} colorLight={light} colorDark={dark} index={4}/>
  </Box>);
};

export default LoadingCube;
