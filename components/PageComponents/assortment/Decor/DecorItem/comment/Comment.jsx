import { Button, TextField, TableCell } from '@mui/material';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';
import { FcCheckmark } from 'react-icons/fc';

const Comment = ({decor, comment, handleSaveComment, isEditingComment, newComment, setNewComment, setIsEditingComment}) => {
    return (
      <>
            {comment ? (
            <div style={{ padding: 0, display: 'flex',  flexWrap: 'nowrap', gap: '10px', alignItems: 'center'}}>
                <CiEdit
                  size="1.2rem"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setNewComment(comment);
                    setIsEditingComment(true);
                  }}
                />
                {isEditingComment ? (
                    <div style={{ display: 'flex', gap: '10px',  flexWrap: 'nowrap', alignItems: 'center' }}>
                      <TextField 
                        color="primary" 
                        size="small"
                        variant="standard"
                        value={newComment} 
                        onChange={(event) => setNewComment(event.target.value)}
                      />
                      <FcCheckmark
                        onClick={handleSaveComment}
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                        size="1.5rem"
                      />
                      <AiOutlineClose
                        onClick={() => setIsEditingComment(false)}
                        style={{ cursor: 'pointer'}}
                        size="1.5rem"
                      />
                    </div>
                ) : (
                  <div>
                    {comment}
                  </div>
                )}
            </div>
                ) : (
                <div style={{ padding: 0, display: 'flex', flexWrap: 'nowrap', gap: '10px', alignItems: 'center'}}>
                    <CiEdit
                      size="1.2rem"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setNewComment(comment);
                        setIsEditingComment(true);
                      }}
                    />
                    {isEditingComment ? (
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <TextField 
                          color="primary" 
                          size="small"
                          variant="standard"
                          value={newComment} 
                          onChange={(event) => setNewComment(event.target.value)}
                        />
                        <FcCheckmark
                          onClick={handleSaveComment}
                          style={{ cursor: 'pointer', marginRight: '10px' }}
                          size="1.5rem"
                        />
                        <AiOutlineClose
                          onClick={() => setIsEditingComment(false)}
                          style={{ cursor: 'pointer'}}
                          size="1.5rem"
                        />
                      </div>
                    ) : (
                      <div>
                        <p>Коментар</p>
                        <p>Тут буде ваш коментар</p>
                      </div>
                    )}
                      </div>
                )}
        </>
    )
}

export default Comment;