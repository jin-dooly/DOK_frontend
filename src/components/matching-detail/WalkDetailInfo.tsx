import { LocationOn, AccessTime, CalendarToday, MonetizationOn, Chat } from '@mui/icons-material';
import { HandlerRequestButton } from './HandlerRequestButton';
import { HandlerSelectContainer } from './HandlerSelectContainer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setRequestHandlers } from 'store/index';
import { LocationMap } from './LocationMap';
import { useEffect } from 'react';
import dateTimeFormat from '../../utils/dateTimeFormat';
import durationTimeFormat from '../../utils/durationTimeFormat';
import calculateWalkingTime from '../../utils/calculateWalkingTime';
import { matchingPostDetailUrl } from 'api/apiUrls';
import { HandlerContainer, MapLayout, TextAlignLayout, WalkDetailLayout, WalkInfoBox, WalkInfoItem } from './WalkDetailInfo.style';

export function WalkDetailInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const { matchingDetailPost } = useSelector((state: RootState) => state.matching);
  const { user } = useSelector((state: RootState) => state.user);
  if (!matchingDetailPost) return <></>;
  const { location, locationDetail, price, requestText, walkingDate, walkingDuration, matchingStatus, user: postUser } = matchingDetailPost;
  const isAuthor = user._id === postUser._id;

  //매칭글의 핸들러 요청 목록 가져오기
  useEffect(() => {
    const RequestHandlerList = async () => {
      try {
        const res = await fetch(`${matchingPostDetailUrl}/handler/${matchingDetailPost?._id}`);
        const data = await res.json();

        if (res.ok) {
          dispatch(setRequestHandlers(data));
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log('fetch error: ' + error);
      }
    };

    RequestHandlerList();
  }, [isAuthor, matchingDetailPost]);

  return (
    <WalkDetailLayout>
      <WalkInfoBox>
        <WalkInfoItem>
          <TextAlignLayout>
            <CalendarToday />
            <span>산책 날짜</span>
          </TextAlignLayout>
          <p>{dateTimeFormat(walkingDate.toString(), 'date')}</p>
        </WalkInfoItem>
        <WalkInfoItem>
          <TextAlignLayout>
            <AccessTime />
            <span>산책 시간</span>
          </TextAlignLayout>
          <p>{calculateWalkingTime(walkingDate.toString(), walkingDuration)}</p>
          <p className="sub-info">({durationTimeFormat(walkingDuration)})</p>
        </WalkInfoItem>
        <WalkInfoItem>
          <MapLayout>
            <TextAlignLayout>
              <LocationOn />
              <TextAlignLayout>
                <span>만남 장소</span>
                <div>
                  <p>{`${location?.text}`}</p>
                  {locationDetail && <p className="sub-info">({locationDetail})</p>}
                </div>
              </TextAlignLayout>
            </TextAlignLayout>
            <LocationMap></LocationMap>
          </MapLayout>
        </WalkInfoItem>
        <WalkInfoItem>
          <TextAlignLayout>
            <MonetizationOn />
            <span>금액</span>
          </TextAlignLayout>
          <p>{price.toLocaleString()}원</p>
        </WalkInfoItem>
        <WalkInfoItem>
          <TextAlignLayout>
            <Chat />
            <span>요구사항</span>
          </TextAlignLayout>
          <p>{requestText}</p>
        </WalkInfoItem>
      </WalkInfoBox>
      {matchingStatus === 'process' && <HandlerContainer>{isAuthor ? <HandlerSelectContainer /> : <HandlerRequestButton />}</HandlerContainer>}
    </WalkDetailLayout>
  );
}
