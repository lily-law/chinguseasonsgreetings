import React, {useEffect, useState, useRef} from 'react'
import { interpolate as flubberInterpolate } from 'flubber'
import { useSpring, animated } from 'react-spring'

const paths = [
  {
    from: 'M308.387 53.1194L53.1219 52.6131L52.6157 307.879L307.881 308.385L308.387 53.1194Z',
    to: 'M361.002 180.5L180.502 0L0.00154676 180.5L180.502 361.001L361.002 180.5Z'
  },
  {
    from: 'M299.084 61.677L58.6389 61.9439L58.9059 302.389L299.351 302.122L299.084 61.677Z',
    to: 'M326.242 97.0432L93.9991 34.7753L31.7312 267.018L263.974 329.286L326.242 97.0432Z'
  },
  {
    from: 'M283.005 74.6113L75.0955 75.9961L76.4998 286.834L284.41 285.449L283.005 74.6113Z',
    to: 'M252.515 51.8274L51.6939 105.671L106.296 309.321L307.117 255.477L252.515 51.8274Z'
  },
  {
    from: 'M270.122 89.808H87.9869V271.943H270.122V89.808Z',
    to: 'M270.122 89.808H87.9868V271.943H270.122V89.808Z'
  }
]

function Present() {
  const [interpolators, setInterpolators] = useState([])
  let clicked = false
  const open = useRef(false)
  const inProgress = useRef(false)
  const [{ wraping }, setWraping] = useSpring(() => ({ from: {wraping: 0}, wraping: 0, reset: true, delay: 1000, config: { mass: 1, tension: 280, friction: 60 }}))
  const [{ bow }, setBow] = useSpring(() => ({ from: {bow: 1}, reset: true, bow: 1, delay: 500}))
  const [{ gift }, setGift] = useSpring(() => ({ from: {gift: 0}, reset: true, gift: 0, delay: 1500, config: { mass: 1, tension: 120, friction: 14 }}))
    
  useEffect(() => {
    const interpolators = []
    for (let {from, to} of paths) {
      interpolators.push(
        flubberInterpolate(from, to, { maxSegmentLength: 0.5 })
      )
    }
    setInterpolators(interpolators)
  }, [])

  const setProgress = (tag, active) => {
    inProgress.current = {...inProgress.current, [tag]: active}
  } 

  const handleToggleOpen = () => {
    if (!clicked && !Object.values(inProgress.current).some(active => active)) {
      clicked = true
      const isOpening = !open.current
      setWraping({ onStart: () => setProgress('wraping', true), onRest: () => setProgress('wraping', false), reverse: !isOpening, from: {wraping: 0}, wraping: 1, reset: true, delay: 500, config: { mass: 1, tension: 280, friction: 60 }})
      setBow({ onStart: () => setProgress('bow', true), onRest: () => setProgress('bow', false), reverse: !isOpening, from: {bow: 1}, reset: true, bow: 0, delay: !isOpening ? 1000 : 0})
      setGift({ onStart: () => setProgress('gift', true), onRest: () => setProgress('gift', false), reverse: !isOpening, from: {gift: 0}, reset: true, gift: 1, delay: 500, config: { mass: 1, tension: 120, friction: 14 }})
      open.current = isOpening
    }
    
    setTimeout(() => clicked = false, 500)
  }
  
  return (
      <div onClick={handleToggleOpen}>
        {
         interpolators.length > 0 &&
          <svg width="360" height="361" viewBox="0 0 360 361" fill="none" xmlns="http://www.w3.org/2000/svg">
            <animated.path d={wraping.interpolate(wraping => interpolators[0](wraping))} fill="#D091E0"/>
            <animated.path d={wraping.interpolate(wraping => interpolators[1](wraping))} fill="#EB397A" fillOpacity="0.75"/>
            <animated.path d={wraping.interpolate(wraping => interpolators[2](wraping))} fill="#4FD6FF" fillOpacity="0.75"/>
            <animated.path d={wraping.interpolate(wraping => interpolators[3](wraping))} fill="#16E268" fillOpacity="0.75"/>
            <animated.g fillOpacity={bow}>
              <path d="M230.41 181.205L180.205 131L130 181.205L180.205 231.409L230.41 181.205Z" fill="#D091E0"/>
              <path d="M223.688 156.115L155.102 137.726L136.713 206.312L205.299 224.701L223.688 156.115Z" fill="#EB397A" />
              <path d="M205.312 136.747L136.726 155.136L155.374 224.688L223.96 206.299L205.312 136.747Z" fill="#4FD6FF" />
              <path d="M216.226 144.76H144.226V216.76H216.226V144.76Z" fill="#16E268" />
            </animated.g>
            <animated.g fillOpacity={gift}>
              <path d="M179.726 160.76L204.226 178.76H155.226L179.726 160.76Z" fill="white"/>
              <path d="M160.726 163.76H167.726V175.76H160.726V163.76Z" fill="white"/>
              <path d="M167.853 199.76H159.226V178.76H201.226V199.76H192.599C193.016 198.468 193.227 197.118 193.226 195.76C193.222 192.313 191.851 189.009 189.414 186.572C186.977 184.135 183.673 182.764 180.226 182.76C176.779 182.764 173.475 184.135 171.038 186.572C168.601 189.009 167.23 192.313 167.226 195.76C167.225 197.118 167.436 198.468 167.852 199.76H167.853Z" fill="white"/>
            </animated.g>
          </svg>
        }
      </div>
    )
}

export default Present;
