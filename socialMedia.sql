create database if not exists `socialMedia` /*!40100 DEFAULT CHARACTER SET latin1 */;
use `socialMedia`;

create table if not exists user(
	userId int(5) not null auto_increment,
	username varchar(50),
	name varchar(50),
	email varchar(50),
	password varchar(50),
	about varchar(1000), 
	birthday varchar(50),
	primary key(userId)
); /*ENGINE = InnoDB DEFAULT CHARSET = latin1*/

create table if not exists friendList(
	friendId int(5) not null,
	userId int(5) not null
); /*ENGINE = InnoDB DEFAULT CHARSET = latin1*/

create table if not exists userPost(
	postId int(5) not null auto_increment,
	userId int(5) not null,
	content varchar(1000),
	postDate timestamp not null default(curdate()),
	primary key(postId)
); /*ENGINE = InnoDB DEFAULT CHARSET = latin1*/

create table if not exists userComment(
	commentId int(5) not null auto_increment,
	postId int(5) not null,
	userId int(5) not null,
	comment varchar(1000),
	commentDate timestamp not null default(curdate()),
	primary key(commentId)
); /*ENGINE = InnoDB DEFAULT CHARSET = latin1*/


create table if not exists friendRequest(
	requestId int(5) not null auto_increment,
	userId int(5) not null,
	friendId int(5) not null,
	primary key(requestId)
); /*ENGINE = InnoDB DEFAULT CHARSET = latin1*/

insert into user(username, name, email, password, birthday) values("Ru", "John Philip Ruart M. Ranosa", "jmranosa@up.edu.ph", "password", "12/27/1998");
insert into user(username, name, email, password, birthday) values("Jack", "Jack Reacher", "jack@up.edu.ph", "password", "12/17/1998");
insert into user(username, name, email, password, birthday) values("Lailah", "Lailah Rose", "lailah@up.edu.ph", "password", "12/27/1997");
insert into user(username, name, email, password, birthday) values("Ana", "Ana Maganda", "ana@up.edu.ph", "password", "12/27/1998");

insert into friendList(friendId, userId) values(2, 1);
insert into friendList(friendId, userId) values(3, 1);
insert into friendList(friendId, userId) values(4, 1);

insert into userPost(userId, content, postDate) values(1, "FUCK LIFE", curdate());
insert into userPost(userId, content, postDate) values(2, "Shut up", curdate());
insert into userPost(userId, content, postDate) values(3, "Comsci life is the high life", curdate());
insert into userPost(userId, content, postDate) values(4, "Hello everyone", curdate());

insert into userComment(postId, userId, comment, commentDate) values(3, 1, "True dat my friend", curdate());