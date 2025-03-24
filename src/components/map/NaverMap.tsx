'use client'

import { useState, useEffect, useRef } from 'react'

interface NaverMapProps {
  description?: string
  latitude: number
  longitude: number
}

const NaverMap = ({ description, latitude, longitude }: NaverMapProps) => {
  const mapElement = useRef(null)

  // 비동기적으로 화면이 로드될 때 네이버 맵스 스크립트가 로드되는지 확인하고 로드가 되면 지도를 그리기 위해 필요한 로직!
  const [naverMapsLoaded, setNaverMapsLoaded] = useState(false)
  useEffect(() => {
    if (window.naver && window.naver.maps) {
      setNaverMapsLoaded(true)
    } else {
      const intervalId = setInterval(() => {
        if (window.naver && window.naver.maps) {
          setNaverMapsLoaded(true)
          clearInterval(intervalId)
        }
      }, 100) // 100ms마다 체크

      // 클린업 함수
      return () => clearInterval(intervalId)
    }
  }, [])

  //naverMapsLoaded가 true로 바뀌면 지도 그리기!
  useEffect(() => {
    // 지도 초기화
    if (mapElement.current && naverMapsLoaded) {
      const { naver } = window
      const location = new naver.maps.LatLng(latitude, longitude) // 위도, 경도
      const mapOptions = {
        center: location,
        zoom: 16,
        zoomControl: false,
      }
      const map = new naver.maps.Map(mapElement.current, mapOptions)

      const marker = new naver.maps.Marker({
        position: location,
        map: map,
        icon: {
          url: '/images/pin.svg',
          origin: new naver.maps.Point(0, 0),
        },
      })

      const infoWindow = new naver.maps.InfoWindow({
        content: `<div style="font-size: 14px; font-weight: 600; text-shadow: 1px 1px 0px white, -1px -1px 0px white, 1px -1px 0px white, -1px 1px 0px white;">${description}</div>`,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        disableAnchor: true,
        pixelOffset: new naver.maps.Point(0, 20),
      })

      infoWindow.open(map, marker)
    }
  }, [naverMapsLoaded]) // naverMapsLoaded가 변경될 때만 실행

  return <div ref={mapElement} className="w-full h-full"></div>
}

export default NaverMap
