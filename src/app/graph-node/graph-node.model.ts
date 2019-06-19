interface GraphNodeInterface {
  objectId: string;
  parentObjects: string[];
  explicitRolesAssignment: [
    {
      userId?: string;
      groupId?: string;
      roles: string[];
    }
  ];
}

export class GraphNode {
  public objectId: string;
  public parentObjects: string[];

  explicitRolesAssignment;
  constructor(
    objectId: string,
    parentObjects: string[],
    userId: string,
    groupId: string,
    roles: string[]
  ) {
    this.objectId = objectId;
    this.parentObjects = parentObjects;
    this.explicitRolesAssignment = [
      {
        userId: userId,
        groupId: groupId,
        roles: roles
      }
    ];
  }
}
