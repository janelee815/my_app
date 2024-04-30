// Page.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import seoul_library_now from "./seoul_library_now.json";
const { kakao } = window;


function Page() {
  // seoul_library_now에 데이터가 있는 경우
  const libraryData = seoul_library_now.DATA || [];
  console.log(seoul_library_now.DATA);
  const librarylatitude = {};
  const librarylng = {};
  // 배열의 각 요소에서 위도 값을 librarylatitude 객체에 추가
  for (let i = 0; i < libraryData.length; i++) {
      const latitude = libraryData[i].xcnts; // 현재 요소의 위도 값
      librarylatitude[i] = latitude; // 해당 인덱스에 위도 값을 할당
  }
  console.log(librarylatitude);
    // 배열의 각 요소에서 위도 값을 librarylatitude 객체에 추가
    for (let i = 0; i < libraryData.length; i++) {
      const lng = libraryData[i].ydnts; // 현재 요소의 위도 값
      librarylng[i] = lng; // 해당 인덱스에 위도 값을 할당
  }
  console.log(librarylng);


  // 배열을 담은 JSON 파일의 데이터에 접근할 때는 map() 함수를 이용
  const dataData = libraryData.map((item, index) => (
    <li key={index}>
      {item.adres}
    </li>
  ));
  useEffect(() => {
    const mapContainer = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    const mapOption = { // 지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.5519, 126.9918), // 지도의 중심좌표
      level: 7 // 지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성 및 객체 리턴

    // 각 도서관의 위도와 경도를 이용하여 마커를 생성하고 지도에 추가
    for (let i = 0; i < libraryData.length; i++) {
      const latitude = parseFloat(libraryData[i].xcnts); // 위도를 숫자로 변환
      const longitude = parseFloat(libraryData[i].ydnts); // 경도를 숫자로 변환
      const markerPosition = new kakao.maps.LatLng(latitude, longitude); // 마커의 위치 생성

      // 마커를 생성하여 지도에 표시
      const marker = new kakao.maps.Marker({
        position: markerPosition
      });

      // 마커를 지도에 표시
      marker.setMap(map);
    }
}, []);


  return (
    <div>
      <div style={{display:'flex'}}>
        <img src='https://i.namu.wiki/i/pj89JqKGC1QWVlysgGvKRwVw_ODe5p7MmwufZjLsKypz7mXcG7z2WffIgmxIdzqy1_JveTDvmgkOcWRqtzA_oA.svg' 
        style={{width:'30px', height:'30px', marginTop:'0.7%', marginLeft:'5%'}}></img>
        <h3 style={{marginLeft:'0.3%'}}>서울특별시</h3>
      </div>
      <div style={{display:'flex'}}>
        <div style={{width:'500px', height:'500px',backgroundColor:'blue'}}>cc</div>
        {/*<ul>{dataData}</ul>*/}
        <div id="map" style={{width:'1000px',height:'400px'}}></div> 
      </div>
	



    </div>
  );
};

export default Page;
