import { ProfileInfo } from '@common/user/ProfileInfo';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import calculateAge from '@utils/calculateAge';
import { EditMenu } from '@common/user/EditMenu';
import { DogIcon, DogImage, DogInfoListItem, DogNameBox, DogProfileContainer } from './DogProfile.style';

export function DogProfile() {
  const { matchingDetailPost } = useSelector((state: RootState) => state.matching);
  const { user: _user } = useSelector((state: RootState) => state.user);
  if (!matchingDetailPost) return <></>;
  const { user, userDog, createdAt, matchingStatus } = matchingDetailPost;
  const { birth: dogBirth, profileImg, name, species, gender: dogGender, note: dogNote, personality: dogPersonality } = userDog;

  return (
    <DogProfileContainer>
      <ProfileInfo _id={user._id} profileImg={user.profileImg} nickname={user.nickname} time={createdAt.toString()} />
      {_user._id === user._id && matchingStatus === 'process' && <EditMenu post={matchingDetailPost} />}
      <DogImage src={profileImg} />
      <DogNameBox>
        <DogIcon src="/svg/card_dog_icon.svg" />
        <p>{name}</p>
      </DogNameBox>
      <ul>
        <li>
          <DogInfoListItem>
            <span>나이:</span>
            <p>{calculateAge(dogBirth.toString())}</p>
          </DogInfoListItem>
        </li>
        <li>
          <DogInfoListItem>
            <span>견종:</span>
            <p>{species}</p>
          </DogInfoListItem>
        </li>
        <li>
          <DogInfoListItem>
            <span>성별:</span>
            <p>{dogGender === 'Male' ? '남자' : '여자'}</p>
          </DogInfoListItem>
        </li>
        <li>
          <DogInfoListItem>
            <span>성격:</span>
            <p>{dogPersonality}</p>
          </DogInfoListItem>
        </li>
        <li>
          <DogInfoListItem>
            <span>특이사항:</span>
            <p>{dogNote || '없음'}</p>
          </DogInfoListItem>
        </li>
      </ul>
    </DogProfileContainer>
  );
}
