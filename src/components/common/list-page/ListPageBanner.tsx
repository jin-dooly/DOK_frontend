import { Section, InnerBox, TitleBox, RightBox } from './ListPageBanner.styled';
import petIcon from '/svg/pets.svg';
import footprintImg from '/svg/six_footprint.svg';
import React from 'react';

interface ListPageBannerProps {
  title: string;
  desc: string;
  children: React.ReactNode;
  color?: 'sub' | 'sub2' | 'sub3';
}

export function ListPageBanner({ title, desc, children, color }: ListPageBannerProps) {
  return (
    <Section color={color}>
      <InnerBox>
        <img className="pet-image" src={petIcon} />
        <TitleBox>
          <h1>{title}</h1>
          <div className="desc">{desc}</div>
        </TitleBox>
        <img className="footprint" src={footprintImg} />
        <RightBox>{children}</RightBox>
      </InnerBox>
    </Section>
  );
}
