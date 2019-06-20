import { Component, OnInit } from "@angular/core";
import { GraphNodesService } from "./graph-nodes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GraphNode } from "./graph-node.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { forbiddenNameValidator } from "./form.validator";

@Component({
  selector: "app-graph-node",
  templateUrl: "./graph-node.page.html",
  styleUrls: ["./graph-node.page.scss"]
})
export class GraphNodePage implements OnInit {
  selectedNode: GraphNode;
  childrenNodes: GraphNode[];
  form: FormGroup;
  forbiddenIds: string[];

  constructor(
    private graphNodesService: GraphNodesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("id")) {
        return;
      }
      this.selectedNode = this.graphNodesService.getNode(paramMap.get("id"));
      this.forbiddenIds = this.graphNodesService.getAllIds(
        this.selectedNode.objectId
      );

      // if no page redirecting to the first element in the array
      if (typeof this.selectedNode === "undefined") {
        const id = this.graphNodesService.getAllNodes()[0].objectId;
        this.router.navigateByUrl("/graph/" + id);
      } else {
        // extracting data for form
        let objectId = this.selectedNode.objectId;
        let parentObjects = this.selectedNode.parentObjects
          ? this.selectedNode.parentObjects
          : "root";

        let userId = this.selectedNode.explicitRolesAssignment
          ? this.selectedNode.explicitRolesAssignment[0].userId
          : "";

        let groupId = this.selectedNode.explicitRolesAssignment
          ? this.selectedNode.explicitRolesAssignment[0].groupId
          : "";
        let roles = this.selectedNode.explicitRolesAssignment
          ? this.selectedNode.explicitRolesAssignment[0].roles[0]
          : "";
        // getting all of the children
        this.childrenNodes = this.graphNodesService.findChildren(
          paramMap.get("id")
        );
        // creating a form
        this.form = new FormGroup({
          objectId: new FormControl(objectId, {
            updateOn: "blur",
            validators: [
              Validators.required,
              forbiddenNameValidator(this.forbiddenIds)
            ]
          }),
          parentObjects: new FormControl(parentObjects, {
            updateOn: "blur",
            validators: [Validators.required]
          }),
          userId: new FormControl(userId, {
            updateOn: "blur",
            validators: [Validators.required]
          }),
          groupId: new FormControl(groupId, {
            updateOn: "blur"
          }),
          roles: new FormControl(roles, {
            updateOn: "blur",
            validators: [Validators.required]
          })
        });
      }
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const data = {
      objectId: this.form.value.objectId,
      userId: this.form.value.userId,
      roles: [this.form.value.roles],
      groupId: this.form.value.groupId
    };
    this.graphNodesService.updateNode(this.selectedNode.objectId, data);
    this.router.navigate(["../" + data.objectId], { relativeTo: this.route });
  }
}
