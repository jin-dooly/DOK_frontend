import { useEffect, useState } from 'react';
import * as styled from './MatchingForm.styled';
import { PostCreateFormLayout } from 'common/create-page/PostCreateFormLayout';
import { AlertSnackbar } from 'common/alert/AlertSnackbar';
import { AlertSuccess } from 'common/alert/AlertSuccess';
import { DogSelect } from '../components/matching-form/DogSelect';
import { DateSelect } from '../components/matching-form/DateSelect';
import { DurationSelect } from '../components/matching-form/DurationSelect';
import { PaySelect } from '../components/matching-form/PaySelect';
import { RequestTextField } from '../components/matching-form/RequestTextField';
import { LocationSelect } from '../components/matching-form/LocationSelect';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState, setDateSelect, setDogSelect, setDurationSelect, setLocation, setLocationDetail, setPaySelect, setRequestText } from 'store/index';
import { useNavigate } from 'react-router';
import { PostCreateGroup } from 'common/create-page/PostCreateGroup';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import { Forbidden } from 'common/state/Forbidden';
import { AlertError } from 'common/alert/AlertError';
import { matchingFormUrl } from 'api/apiUrls';
import dateTimeFormat from '../utils/dateTimeFormat';
import durationTimeFormat from '../utils/durationTimeFormat';
import { AlertBottom } from 'common/alert/AlertBottom';
import { DogType } from 'src/types';

export function MatchingUpdatePage() {
  const { dogSelect, errorDogSelect, dateSelect, errorDateSelect, durationSelect, paySelect, errorPaySelect, requestText, locationSelect, locationDetailSelect } = useSelector(
    (state: RootState) => state.matchingForm,
  );
  const [initData, setInitData] = useState<{
    dogSelect: DogType | undefined;
    dateSelect: string | undefined;
    durationSelect: number;
    paySelect: number;
    requestText: string | undefined;
    locationSelect: { text: string; code: string } | undefined;
    locationDetailSelect: string;
  }>({
    dogSelect,
    dateSelect,
    durationSelect,
    paySelect,
    requestText,
    locationSelect,
    locationDetailSelect,
  });
  const dispatch = useDispatch<AppDispatch>();
  const [isForbidden, setIsForbidden] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const [validateText, setValidateText] = useState<string>('');
  const [openSubmit, setOpenSubmit] = useState<boolean>(false);
  const [openCancle, setOpenCancle] = useState<boolean>(false);
  const [openAlertBottom, setOpenAlertBottom] = useState<boolean>(false);
  const [alertDesc, setAlertDesc] = useState<string>('');
  const nav = useNavigate();
  const loc = useLocation();

  // 매칭 글 업데이트
  const handleSubmit = async () => {
    const reqBody = {
      userDog: dogSelect?._id,
      price: paySelect,
      location: locationSelect,
      locationDetail: locationDetailSelect,
      walkingDate: dayjs(dateSelect).format('YYYY-MM-DDTHH:mm:ss.000'),
      walkingDuration: durationSelect,
      requestText,
    };

    const _id = loc.state.post._id;
    try {
      const res = await fetch(`${matchingFormUrl}/newMatchingRequest/${_id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(reqBody),
      });

      if (res.ok) {
        nav('/matching');
      } else {
        const data = await res.json();
        console.log(data);
        setAlertDesc('매칭 글 수정에 실패하였습니다. 다시 시도해주세요.');
        setOpenAlertBottom(true);
      }
    } catch (e) {
      console.log('fetch error: ', e);
      setAlertDesc('매칭 글 수정에 실패하였습니다. 다시 시도해주세요.');
      setOpenAlertBottom(true);
    }
  };

  const handleClickSubmit = () => {
    if (errorDogSelect) {
      setValidateText('강아지를 선택해주세요.');
      return setOpenError(true);
    }
    if (errorDateSelect) {
      setValidateText('날짜를 다시 선택해주세요.');
      return setOpenError(true);
    }
    if (errorPaySelect) {
      setValidateText('알바 가격을 선택해주세요.');
      return setOpenError(true);
    }
    if (requestText && requestText?.length < 5) {
      setValidateText('요청 메시지를 작성해주세요.');
      return setOpenError(true);
    }
    setOpenSubmit(true);
  };

  const handleCancle = () => {
    nav('/matching');
  };

  const handleClickCancle = () => {
    if (
      dogSelect?._id !== initData.dogSelect?._id ||
      dateSelect !== initData.dateSelect ||
      durationSelect !== initData.durationSelect ||
      paySelect !== initData.paySelect ||
      requestText !== initData.requestText ||
      locationSelect?.code !== initData.locationSelect?.code ||
      locationDetailSelect !== initData.locationDetailSelect
    ) {
      return setOpenCancle(true);
    }
    handleCancle();
  };

  useEffect(() => {
    if (!loc.state?.post) {
      return setIsForbidden(true);
    }

    const { userDog, price, locationDetail, requestText, walkingDate, walkingDuration } = loc.state.post;

    dispatch(setDogSelect(userDog));
    dispatch(setDateSelect(walkingDate));
    dispatch(setDurationSelect(walkingDuration));
    dispatch(setPaySelect(price));
    dispatch(setLocationDetail(locationDetail));
    dispatch(setRequestText(requestText));

    return () => {
      dispatch(setLocation(undefined));
    };
  }, []);

  return isForbidden ? (
    <Forbidden />
  ) : (
    <styled.CertifiCreate>
      <AlertBottom open={openAlertBottom} onClose={() => setOpenAlertBottom(false)} type="error" desc={alertDesc} />

      <AlertSnackbar open={openError} onClose={() => setOpenError(false)} type="error" title="잘못된 입력" desc={validateText} />
      <AlertSuccess
        open={openSubmit}
        onClose={() => setOpenSubmit(false)}
        onClick={handleSubmit}
        title="글을 수정하시겠습니까?"
        desc={`${dogSelect?.dogName} | ${dateTimeFormat(dateSelect || '', 'date-time')} | ${durationTimeFormat(
          durationSelect,
        )} | ${paySelect}원\n요청 사항 : ${requestText}\n만남 위치 : ${locationSelect?.text} ${locationDetailSelect || ''}`}
      />
      <AlertError open={openCancle} onClose={() => setOpenCancle(false)} onClick={handleCancle} title="수정을 취소하시겠습니까?" desc="작성한 내용은 저장되지 않습니다." />

      <div className="body">
        <PostCreateFormLayout title="매칭 신청 수정하기" buttonText="수정하기" onSubmit={handleClickSubmit} onReset={handleClickCancle}>
          <PostCreateGroup title="Pet">
            <styled.Contents>
              <DogSelect isUpdate={true} />
            </styled.Contents>
          </PostCreateGroup>

          <PostCreateGroup title="Infomation">
            <div className="flex">
              <div className="half">
                <styled.Contents>
                  <DateSelect />
                </styled.Contents>
                <styled.Contents>
                  <DurationSelect />
                </styled.Contents>
              </div>
              <div className="half">
                <styled.Contents>
                  <PaySelect />
                </styled.Contents>
                <styled.Contents>
                  <LocationSelect editLocation={{ text: loc.state.post.location.text, code: loc.state.post.location.code }} />
                </styled.Contents>
              </div>
            </div>
          </PostCreateGroup>

          <PostCreateGroup title="Addition">
            <styled.Contents>
              <RequestTextField isUpdate={true} />
            </styled.Contents>
          </PostCreateGroup>
        </PostCreateFormLayout>
      </div>
    </styled.CertifiCreate>
  );
}
