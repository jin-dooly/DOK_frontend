import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setMatchingBookmark } from 'store/index';
import { Certification, TableContainer } from './MatchingBookmark.style';
import header_bookmark_off from '/svg/header_bookmark_off.svg';
import header_bookmark_on from '/svg/header_bookmark_on.svg';
import { bookmarkUrl } from 'api/apiUrls';

export function MatchingBookmark() {
  const { user } = useSelector((state: RootState) => state.user);
  const { matchingBookmark } = useSelector((state: RootState) => state.matching) as any;
  const dispatch = useDispatch<AppDispatch>();
  const [openBox, setOpenBox] = useState<boolean>(false);

  // 작성한 매칭글 API 연동
  const getUserMachingList = async () => {
    try {
      const res = await fetch(`${bookmarkUrl}/myMatchingPostInfo`, { credentials: 'include' });
      const data = await res.json();

      if (res.ok) {
        dispatch(setMatchingBookmark(data));
      } else {
        console.log(`false ${data}`);
      }
    } catch (e) {
      console.log('fetch error: ', e);
    }
  };

  const handleClickIcon = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!openBox) {
      getUserMachingList();
    }
    setOpenBox(!openBox);
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (openBox) {
      setOpenBox(false);
    }
  };

  useEffect(() => {
    if (user._id) {
      getUserMachingList();
    }
  }, []);

  return (
    <>
      {(user._id && !matchingBookmark.length) || (
        <Certification>
          <div onClick={handleClickIcon}>{openBox ? <img src={header_bookmark_off} className="icon" /> : <img src={header_bookmark_on} className="icon" />}</div>
          {openBox && (
            <>
              <div className="hidden" onClick={handleClose}></div>
              <TableContainer>
                <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>작성한 매칭글을 빠르게 조회해 보세요.</TableCell>
                      <TableCell align="right">요청자 수</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {matchingBookmark.map((post: any) =>
                      post.map((item: any, index: any) =>
                        item.userDog?.dogName ? (
                          <TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                              {item.userDog?.dogName} | {item.walkingDate?.split('T')[0]} | {item.walkingDuration * 60}분
                            </TableCell>
                            <TableCell align="right">
                              <Button id={item._id} color="subW" variant="outlined" size="small">
                                <a href={`/matching/${item._id}`}>{matchingBookmark[1][index]}건의 요청</a>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ) : null,
                      ),
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Certification>
      )}
    </>
  );
}
