import { useState } from 'react';
import tabLeft from '/svg/modify_tab_left.svg';
import tabRight from '/svg/modify_tab_right.svg';
import { ModifyInfo } from './ModifyInfo';
import { ChangePassword } from './ChangePassword';
import { MainContainer, ModifyContainer, ModifyTab, TabContainer, TabImg } from './Modify.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setCheckModifyInfoIsValid, setOpenErrorModifyInfoAlert, setOpenModifyInfoAlert, setOpenSuccessModifyInfoSnackbar } from 'store/index';
import { AlertSnackbar } from 'common/alert/AlertSnackbar';
import { AlertSuccess } from 'common/alert/AlertSuccess';
import { AlertError } from 'common/alert/AlertError';

export const Modify = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { openErrorModifyInfoAlert, openModifyInfoAlert, openSuccessModifyInfoSnackbar } = useSelector((state: RootState) => state.alert);
  const [selected, setSelected] = useState<'info' | 'password'>('info');

  return (
    <MainContainer>
      <TabContainer>
        <ModifyTab className={`pointer ${selected === 'info' ? 'selected' : ''}`} onClick={() => setSelected('info')}>
          <span>개인정보 수정</span>
          {selected === 'info' && <TabImg $align="left" src={tabLeft} />}
        </ModifyTab>
        <ModifyTab className={`pointer ${selected === 'password' ? 'selected' : ''}`} onClick={() => setSelected('password')}>
          <span>비밀번호 변경</span>
          {selected === 'password' && <TabImg $align="right" src={tabRight} />}
        </ModifyTab>
      </TabContainer>
      <ModifyContainer>{selected === 'info' ? <ModifyInfo /> : <ChangePassword />}</ModifyContainer>
      <AlertSuccess
        title={openModifyInfoAlert.type === 'info' ? '개인정보를 수정하시겠습니까?' : '비밀번호를 변경하시겠습니까?'}
        open={openModifyInfoAlert.isOpen}
        onClick={() => dispatch(setCheckModifyInfoIsValid(true))}
        onClose={() => dispatch(setOpenModifyInfoAlert({ isOpen: false }))}
      />
      <AlertSnackbar
        title={openSuccessModifyInfoSnackbar.type === 'info' ? '수정이 완료되었습니다.' : '변경이 완료되었습니다.'}
        open={openSuccessModifyInfoSnackbar.isOpen}
        onClose={() => dispatch(setOpenSuccessModifyInfoSnackbar({ isOpen: false }))}
      />
      <AlertError
        title={
          openErrorModifyInfoAlert.type === 'info'
            ? '개인정보 수정에 실패했습니다. 입력한 정보를 다시 확인해주세요.'
            : '비밀번호 변경에 실패했습니다. 입력한 정보를 다시 확인해주세요.'
        }
        open={openErrorModifyInfoAlert.isOpen}
        onClick={() => dispatch(setOpenErrorModifyInfoAlert({ isOpen: false }))}
      />
    </MainContainer>
  );
};
