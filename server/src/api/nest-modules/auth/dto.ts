import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiModelProperty({
    required: true,
  })
  public readonly email!: string;

  @ApiModelProperty({
    required: true,
  })
  public readonly password!: string;
}
