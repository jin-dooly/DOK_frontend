import calculateAge from '@utils/calculateAge';
import dayjs from 'dayjs';
import { InfoFrame, TotalFrame } from './DogCard.style';

interface DogType {
  name: string;
  birth: string | Date;
  gender: string;
  type: string;
  personality: string;
  note: string;
  profileImg: string;
}

export const DogCard = ({ name, gender, birth, type, personality, note, profileImg }: DogType) => {
  return (
    <TotalFrame>
      <img src={profileImg ? profileImg : '/dok_logo.png'} />
      <InfoFrame>
        <div className="name">
          <div>
            <img src="/svg/dog_default.svg" alt="강아지아이콘" style={{ marginRight: '2.5px' }} />
          </div>
          <div>{name}</div>
        </div>
        <div className="species">
          <div>견종</div>
          <div>{type}</div>
        </div>
        <div className="age">
          <div>나이</div>
          <div>
            {calculateAge(birth.toString())} <span>({dayjs(birth).format('MM/DD/YYYY')})</span>
          </div>
        </div>
        <div className="gender">
          <div>성별</div>
          <div>
            {gender === 'male' || gender === 'Male' ? '남자' : gender === 'female' || gender === 'Female' ? '여자' : gender === 'other' || gender === 'Other' ? '중성' : gender}
          </div>
        </div>
        <div className="character">
          <div>성격</div>
          <div>{personality === 'calm' ? '얌전' : personality === 'active' ? '활발' : personality === 'sensitive' ? '예민' : personality}</div>
        </div>
        <div className="note">
          <div>특이사항</div>
          <div className="custom-scrollbar">{note || '없음'}</div>
        </div>
      </InfoFrame>
    </TotalFrame>
  );
};
