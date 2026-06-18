import type { Muscle, MuscleRegion, MuscleSubGroup, MuscleSystem } from "../model/Muscle";
import { Scope, type Scope as ScopeType } from "../model/Scope";
import { MuscleData } from "./MuscleData";

export interface MuscleTrail {
    system: MuscleSystem;
    region: MuscleRegion;
    subGroup: MuscleSubGroup;
    muscle: Muscle;
}

export function getAllSystems(): MuscleSystem[] {
    return MuscleData.muscleSystems;
}

export function getAllRegions(): MuscleRegion[] {
    return getAllSystems().flatMap((system) => system.regions);
}

export function getAllSubGroups(): MuscleSubGroup[] {
    return getAllRegions().flatMap((region) => region.subGroups);
}

export function getAllMuscles(): Muscle[] {
    return getAllSubGroups().flatMap((subGroup) => subGroup.muscles);
}

export function getSystemById(systemId: number): MuscleSystem | undefined {
    return getAllSystems().find((system) => system.id === systemId);
}

export function getRegionById(regionId: number): MuscleRegion | undefined {
    return getAllRegions().find((region) => region.id === regionId);
}

export function getSubGroupById(subGroupId: number): MuscleSubGroup | undefined {
    return getAllSubGroups().find((subGroup) => subGroup.id === subGroupId);
}

export function getMuscleById(muscleId: number): Muscle | undefined {
    return getAllMuscles().find((muscle) => muscle.id === muscleId);
}

export function getMusclesByScope(scope: ScopeType, scopeId: number): Muscle[] {
    if (scope === Scope.System) {
        return (
            getSystemById(scopeId)?.regions.flatMap((region) => region.subGroups.flatMap((subGroup) => subGroup.muscles)) ??
            []
        );
    }

    if (scope === Scope.Region) {
        return getRegionById(scopeId)?.subGroups.flatMap((subGroup) => subGroup.muscles) ?? [];
    }

    return getSubGroupById(scopeId)?.muscles ?? [];
}

export function getScopeTitle(scope: ScopeType, scopeId: number): string {
    if (scope === Scope.System) {
        return getSystemById(scopeId)?.name ?? "Nieznany układ";
    }

    if (scope === Scope.Region) {
        return getRegionById(scopeId)?.name ?? "Nieznany region";
    }

    return getSubGroupById(scopeId)?.name ?? "Nieznana podgrupa";
}

export function getLearningRoute(scope: ScopeType, scopeId: number): string {
    if (scope === Scope.System) {
        return `/system/${scopeId}`;
    }

    if (scope === Scope.Region) {
        return `/region/${scopeId}`;
    }

    return `/subgroup/${scopeId}`;
}

export function countMusclesInSystem(system: MuscleSystem): number {
    return system.regions.reduce((total, region) => total + countMusclesInRegion(region), 0);
}

export function countMusclesInRegion(region: MuscleRegion): number {
    return region.subGroups.reduce((total, subGroup) => total + subGroup.muscles.length, 0);
}

export function findMuscleTrail(muscleId: number): MuscleTrail | undefined {
    for (const system of getAllSystems()) {
        for (const region of system.regions) {
            for (const subGroup of region.subGroups) {
                const muscle = subGroup.muscles.find((entry) => entry.id === muscleId);
                if (muscle) {
                    return {
                        system,
                        region,
                        subGroup,
                        muscle,
                    };
                }
            }
        }
    }

    return undefined;
}
