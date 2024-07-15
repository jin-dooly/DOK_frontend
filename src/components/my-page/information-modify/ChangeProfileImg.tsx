import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setSelectedImg } from 'store/index';
import userImage from '/svg/user_image1.svg';
import ModeIcon from '@mui/icons-material/Mode';
import { EditIcon, ImgContainer, OpacityContainer } from './ChangeProfileImg.style';

export const ChangeProfileImg = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const [imagePath, setImagePath] = useState<string>(user.userImg || userImage);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(setSelectedImg(user.userImg || ''));
  }, []);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e: ProgressEvent<FileReader>) {
        const image = e.target?.result as string;
        setImagePath(image);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });
        const data = await res.json();

        if (res.ok) {
          dispatch(setSelectedImg(data[0]));
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error('이미지 업로드 에러:', error);
      }
    }
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event)} style={{ display: 'none' }} ref={inputRef} id="imageInput" />
      <ImgContainer className="pointer" onClick={handleImageClick} id="selectedImage">
        <img src={imagePath} className="user-img" />
        <OpacityContainer></OpacityContainer>
        <EditIcon>
          <ModeIcon sx={{ fontSize: '35px', color: 'white' }} />
        </EditIcon>
      </ImgContainer>
    </>
  );
};
