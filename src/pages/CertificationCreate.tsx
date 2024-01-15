import React, { Children, useEffect, useState } from 'react';
import * as styled from './CertificationCreate.styled';
import { PostCreateFormLayout } from '../components/common/create-page/PostCreateFormLayout';
import { AddPhotoAlternateOutlined, ChatOutlined, Close, LocationOn, Pets } from '@mui/icons-material';
import { FormLabel, IconButton, TextField } from '@mui/material';
import { PostCreateGroup } from 'common/create-page/PostCreateGroup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AlertSnackbar } from 'common/alert/AlertSnackbar';
import { AlertSuccess } from 'common/alert/AlertSuccess';
import { matchingPostDetailUrl } from 'api/apiUrls';
import { MatchingPostType } from '../types/index';
import dateTimeFormat from '../utils/dateTimeFormat';
import durationTimeFormat from '../utils/durationTimeFormat';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';
import { Forbidden } from 'common/state/Forbidden';
import { NotFound } from 'common/state/NotFoundPage';
import { LoadingPage } from 'common/state/LoadingPage';
import { AlertError } from 'common/alert/AlertError';

export function CertificationCreatePage() {
  const { user } = useSelector((state: RootState) => state.user);
  const { isLoading } = useSelector((state: RootState) => state.alert);
  // 인증 글 작성은 리덕스 사용 X
  // -> useState 사용하기(File 때문에 A non-serializable value was detected in the state 에러 날 수 있음)
  const [matchingPost, setMatchingPost] = useState<MatchingPostType | undefined>();
  const [postText, setPostText] = useState<string>('');
  const [errorPostText, setErrorPostText] = useState<boolean>(true);
  const [address, setAddress] = useState<string>('');
  const [errorAddress, setErrorAddress] = useState<boolean>(true);
  const [images, setImages] = useState<File[]>([]);
  const [imagesURL, setImagesURL] = useState<string[] | null>();
  const [errorImages, setErrorImages] = useState<boolean | string>('init');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [openError, setOpenError] = useState<boolean>(false);
  const [openSubmit, setOpenSubmit] = useState<boolean>(false);
  const [openCancle, setOpenCancle] = useState<boolean>(false);
  const [isForbidden, setIsForbidden] = useState<boolean>(false);
  const [_isLoading, setIsLoading] = useState<boolean>(false);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  const nav = useNavigate();
  const loc = useLocation();

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || (images?.length || 0) + e.target.files.length > 6) {
      setErrorImages(true);
      return;
    }

    let formData = new FormData();
    const newImages = [...images, ...Array.from(e.target.files)];

    newImages.forEach((file) => {
      formData.append('image', file);
    });

    const res = await fetch(`/api/upload/image`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    const data = await res.json();

    setImages(newImages);
    setImagesURL(data);
    setErrorImages(false);
  };

  const handleRemoveImage = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const idx = Number(e.currentTarget.id);
    setErrorImages(false);

    if (!images) return;
    if (images.length <= 1) {
      setImages([]);
      setImagesURL([]);
      setErrorImages(true);
      return;
    }

    const newImages = images.filter((file, _idx) => idx !== _idx);
    let formData = new FormData();
    newImages.forEach((file) => {
      formData.append('image', file);
    });

    const res = await fetch(`/api/upload/image`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    const data = await res.json();

    setImages(newImages);
    setImagesURL(data);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length <= 50) {
      setErrorPostText(true);
    } else {
      setErrorPostText(false);
    }
    setPostText(e.target.value);
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length <= 5) {
      setErrorAddress(true);
    } else {
      setErrorAddress(false);
    }
    if (e.target.value.trim().length <= 20) {
      setAddress(e.target.value);
    }
  };

  const addPost = async () => {
    const reqBody = {
      sublocation: address.trim(),
      postText: postText.trim(),
      certificationImg: imagesURL || [],
    };

    const res = await fetch(`/api/certificationRouter/newCertificationPost/${matchingPost?._id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(reqBody),
    });
    const data = await res.json();

    nav('/certification');
  };

  const handleSubmit = () => {
    setIsSubmit(true);
    if (errorPostText || errorAddress || errorImages) {
      return setOpenError(true);
    }
    setOpenSubmit(true);
  };

  const handleOpenCancle = () => {
    if (postText || address || images.length) {
      return setOpenCancle(true);
    }
    nav(`/certification`);
  };

  useEffect(() => {
    setIsLoading(true);
    const pathArr = loc.pathname.split('/');
    const postId = pathArr[pathArr.length - 1];

    (async () => {
      const res = await fetch(`${matchingPostDetailUrl}/${postId}`);
      const data = await res.json();

      if (!data.length) {
        setIsNotFound(true);
      }

      setMatchingPost(data[0]);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (matchingPost?.matchingHandler !== user._id) {
      setIsForbidden(true);
    } else {
      setIsForbidden(false);
    }
  }, [isLoading, matchingPost]);

  return (
    <>
      {isLoading || _isLoading ? (
        <LoadingPage />
      ) : isNotFound ? (
        <NotFound />
      ) : isForbidden ? (
        <Forbidden />
      ) : (
        <styled.CertifiCreate>
          <AlertSnackbar open={openError} onClose={() => setOpenError(false)} type="error" title="잘못된 데이터입니다." desc="작성한 값을 다시 확인해주세요." />
          <AlertSuccess open={openSubmit} onClose={() => setOpenSubmit(false)} onClick={addPost} title="글을 작성하시겠습니까?" desc={``} />
          <AlertError
            open={openCancle}
            onClose={() => setOpenCancle(false)}
            onClick={() => nav(`/certification`)}
            title="정말 취소하시겠습니까?"
            desc="작성한 내용은 저장되지 않습니다."
          />
          <div className="body">
            <PostCreateFormLayout onSubmit={handleSubmit} onReset={handleOpenCancle} title="인증 등록하기">
              <PostCreateGroup title="Link">
                <styled.Contents>
                  <Pets className="icon" />
                  <Link to={`/matching/${matchingPost?._id}`}>
                    {`${matchingPost?.userDog.dogName} | ${matchingPost?.walkingDate && dateTimeFormat(matchingPost.walkingDate, 'date')} | ${
                      matchingPost?.walkingDate && durationTimeFormat(matchingPost?.walkingDuration)
                    }`}
                  </Link>
                </styled.Contents>
              </PostCreateGroup>

              <PostCreateGroup title="Contents">
                <styled.Contents>
                  <FormLabel component="legend">
                    <LocationOn className="icon" />
                    산책 장소
                  </FormLabel>
                  <TextField
                    id="outlined-multiline-flexible"
                    size="small"
                    value={address}
                    onChange={handleChangeAddress}
                    error={isSubmit && errorAddress}
                    helperText={isSubmit && errorAddress && '5글자 이상 작성해주세요.'}
                    fullWidth
                  />
                </styled.Contents>

                <styled.Contents>
                  <FormLabel component="legend">
                    <ChatOutlined className="icon" />
                    인증 내용
                  </FormLabel>
                  <TextField
                    value={postText}
                    onChange={handleChangeText}
                    id="outlined-multiline-flexible"
                    error={isSubmit && errorPostText}
                    helperText={isSubmit && errorPostText && '50글자 이상 작성해주세요.'}
                    multiline
                    rows={4}
                    fullWidth
                  />
                </styled.Contents>

                <styled.Contents className="file-input ">
                  <FormLabel component="legend">
                    <AddPhotoAlternateOutlined className="icon" />
                    사진
                  </FormLabel>
                  <div>
                    <label htmlFor="photo" className={`MuiInputBase-sizeSmall ${errorImages && errorImages !== 'init' && 'error'}`}>
                      <span>{images.length ? images[0].name + (images.length > 1 ? ` 외 ${images.length - 1}개` : '') : ''}</span>
                      <AddPhotoAlternateOutlined className="pointer" />
                    </label>

                    <input
                      id="photo"
                      type="file"
                      onChange={(e) => {
                        if (!e.target.files?.length) return;
                        handleChangeImage(e);
                      }}
                      multiple
                    />
                  </div>
                  <p className={`helper-text ${errorImages && errorImages !== 'init' && 'error'}`}>사진은 최대 6개까지 업로드 가능합니다.</p>
                  {imagesURL && (
                    <div className="preview custom-scrollbar">
                      {Children.toArray(
                        imagesURL.map((url, idx) => (
                          <div className="preview-image">
                            <img src={url} />
                            <IconButton
                              id={idx.toString()}
                              className="icon"
                              onClick={handleRemoveImage}
                              sx={{ backgroundColor: '#00000021', padding: '12px', ':hover': { backgroundColor: '#00000030' } }}
                            >
                              <Close />
                            </IconButton>
                          </div>
                        )),
                      )}
                    </div>
                  )}
                </styled.Contents>
              </PostCreateGroup>
            </PostCreateFormLayout>
          </div>
        </styled.CertifiCreate>
      )}
    </>
  );
}
