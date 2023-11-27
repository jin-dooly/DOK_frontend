import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';
import { styled } from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export function LocationMap() {
  const { matchingDetailPost } = useSelector((state: RootState) => state.matching);
  if (!matchingDetailPost) return <></>;
  const { location } = matchingDetailPost;
  const [position, setPosition] = useState({ lat: 33.450701, lng: 126.570667 });
  const geocoder = new kakao.maps.services.Geocoder();

  useEffect(() => {
    geocoder.addressSearch(location.text, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setPosition({lat: Number(result[0].y), lng: Number(result[0].x)})
      }
    });
  }, []);

  return (
    <MapContainer>
      <Map // 지도를 표시할 Container
        center={position}
        style={{
          // 지도의 크기
          width: '100%',
          height: '100%',
        }}
        level={4} // 지도의 확대 레벨
      >
        <MapMarker // 마커를 생성합니다
          position={position}
        />
      </Map>
    </MapContainer>
  );
}

const MapContainer = styled.div`
  height: 200px;
`;
