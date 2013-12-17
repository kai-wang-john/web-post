#根据状态查找文章
SELECT
	P.ID AS ID,
	P.TITLE AS TITLE,
	M.VALUE AS COVER,
	P.INTRO AS INTRO,
	P.COMMENT_COUNT AS COMMENTCOUNT,
	P.CREATE_AT AS CREATEAT,
	P.REFERENCE AS REFERENCE,
	P.STATUS AS STATUS,
	P.USER_ID AS USERID,
	U.NAME AS USERNAME
FROM
	POST AS P
	LEFT JOIN META AS M ON P.COVER=M.KEY
	LEFT JOIN USER AS U ON P.USER_ID=U.ID
WHERE
	P.STATUS=?
ORDER BY P.CREATE_AT DESC
LIMIT ?,?