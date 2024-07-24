import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { WarningAmberRounded, WarningRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { MatchingPostType } from '@types';
import dateTimeFormat from '@utils/dateTimeFormat';
import durationTimeFormat from '@utils/durationTimeFormat';
import { Certification, TableContainer } from './CertificationBookmark.styled';
import { myPageUrl } from '@api/apiUrls';

export function CertificationBookmark() {
  const { user } = useSelector((state: RootState) => state.user);
  const [myCertification, setMyCertification] = useState<MatchingPostType[]>([]);
  const [openBox, setOpenBox] = useState<boolean>(false);

  // 로그인 한 사용자가 등록해야 할 인증글 리스트 가져오기
  const getUserCertifiList = async () => {
    try {
      const res = await fetch(`${myPageUrl}/myCertification`, { credentials: 'include' });
      const data = await res.json();

      if (res.ok) {
        setMyCertification(data);
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log('fetch error: ', e);
    }
  };

  const handleClickIcon = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!openBox) {
      getUserCertifiList();
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
      getUserCertifiList();
    }
  }, []);

  return (
    <>
      {(user._id && !myCertification.length) || (
        <Certification>
          <div onClick={handleClickIcon}>{openBox ? <WarningAmberRounded className="icon" /> : <WarningRounded className="icon" />}</div>
          {openBox && (
            <>
              <div className="hidden" onClick={handleClose}></div>
              <TableContainer>
                <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>작성하지 않은 인증 글이 있습니다.</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myCertification.map((post) => (
                      <TableRow key={post._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          <a href={`/matching/${post._id}`}>
                            {post.userDog.name} | {dateTimeFormat(post.walkingDate, 'date-time')} ({durationTimeFormat(post.walkingDuration)})
                          </a>
                        </TableCell>
                        <TableCell align="right">
                          <a href={`/certification/write/${post._id}`}>
                            <Button id={post._id} color="subW" variant="outlined" size="small">
                              작성하기
                            </Button>
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
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
