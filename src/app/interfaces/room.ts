export interface Room {
  id: number;
  type: string;
  price: number;
  taxes: number;
  capacity:number;
  location: string;
  enabled: boolean;
}

export interface RoomMod extends Room{
  hotelName:string,
  hotelId:number
}
