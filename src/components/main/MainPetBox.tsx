import defaultImg from '/svg/dog_default_white.svg';
import Female from '/svg/gender_female.svg';
import Male from '/svg/gender_male.svg';
import { Pet } from './MainPetBox.styled';

interface MainPetBoxProps {
  petData: {
    profileImg: string;
    name: string;
    gender: string;
  };
  className: string;
}

export function MainPetBox({ petData, className }: MainPetBoxProps) {
  return (
    <Pet className={`pet-box ${className}`}>
      <img className="pet-img" src={petData.profileImg || defaultImg} />
      <div className="gender-name">
        <img src={petData.gender === 'Female' ? Female : Male} />
        <div>{petData.name}</div>
      </div>
    </Pet>
  );
}
