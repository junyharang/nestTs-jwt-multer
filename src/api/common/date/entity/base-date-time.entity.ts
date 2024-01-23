import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { DateTimeUtil } from "../util/date.time.util";

export abstract class BaseDateTime {
  // 해당 열이 추가된 시각을 자동으로 기록
  // 만일 Postgres의 time zone이 'UTC'라면 UTC 기준으로 출력하고 'Asia/Seoul'라면 서울 기준으로 출력한다.
  // DB SQL QUERY : set time zone 'Asia/Seoul'; set time zone 'UTC'; show timezone;
  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP", name: "created_date_time", comment: "생성 일시" })
  createdDateTime: Date;

  @UpdateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP", name: "updated_date_time", comment: "수정 일시" })
  updatedDateTime: Date;

  // Soft Delete : 기존에는 null, 삭제시에 timestamp를 찍는다.
  @Exclude()
  @DeleteDateColumn({ type: "datetime", default: () => null, name: "deleted_date_time", comment: "삭제 일시" })
  deletedDateTime?: Date | null;

  getCreateDateTime(): string {
    return DateTimeUtil.toString(DateTimeUtil.toLocalDateTime(this.createdDateTime));
  }

  getUpdateDateTime(): string {
    return DateTimeUtil.toString(DateTimeUtil.toLocalDateTime(this.updatedDateTime));
  }

  getDeleteDateTime(): string {
    return DateTimeUtil.toString(DateTimeUtil.toLocalDateTime(this.deletedDateTime));
  }
}
