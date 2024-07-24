import { matchingFormUrl } from '@api/apiUrls';
import { AlertError } from '@common/alert/AlertError';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState, setMatchingPostEditId, setOpenDeleteAlert, setOpenEditAlert } from '@store/index';

export function AlertControll() {
  const dispatch = useDispatch<AppDispatch>();
  const { matchingPostEditId } = useSelector((state: RootState) => state.matching);
  const { openEditAlert, openDeleteAlert } = useSelector((state: RootState) => state.alert);
  const navigate = useNavigate();

  const handleEditAlert = () => {
    dispatch(setOpenEditAlert(false));
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${matchingFormUrl}/noMatchingRequest/${matchingPostEditId}`, { credentials: 'include', method: 'PUT' });
      const data = await res.json();
      if (res.ok) {
        dispatch(setOpenDeleteAlert(false));
        dispatch(setMatchingPostEditId(''));
        navigate(`/matching`);
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log('fetch error: ', e);
    }
  };

  return (
    <>
      <AlertError open={openEditAlert} onClick={handleEditAlert} desc={'핸들러 지원 요청이 있는 글은 수정이 불가능 합니다.'} />
      <AlertError
        open={openDeleteAlert}
        onClick={handleDelete}
        onClose={() => {
          dispatch(setOpenDeleteAlert(false));
          dispatch(setMatchingPostEditId(''));
        }}
        desc={'정말 삭제하시겠습니까?'}
      />
    </>
  );
}
