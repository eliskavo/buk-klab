import { MemberType } from '../model/Member';
import { getSupabaseClient } from './supabase';

export const isUserClubMember = async (userId: string, clubId: number) => {
  try {
    const { data, error } = await getSupabaseClient()
      .from('clubs_members')
      .select()
      .eq('memberId', userId)
      .eq('clubId', clubId);

    if (error) {
      throw error;
    }

    return data.length > 0;
  } catch (error) {
    console.error('Error checking club membership:', error);
    throw error;
  }
};

export const inviteMemberByEmail = async (clubId: number, email: string) => {
  try {
    const { data: userData } = await getSupabaseClient()
      .from('members')
      .select('id')
      .eq('email', email)
      .single();

    if (!userData) {
      throw new Error('User with this email not found');
    }

    const isMember = await isUserClubMember(userData.id, clubId);
    if (isMember) {
      throw new Error('User is already a member of this club');
    }

    const { error } = await getSupabaseClient().from('clubs_members').insert({
      memberId: userData.id,
      clubId,
      email,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error inviting member:', error);
    throw error;
  }
};

export const getClubMembers = async (clubId: number) => {
  try {
    const { data: memberShipData, error: membershipError } =
      await getSupabaseClient()
        .from('clubs_members')
        .select('memberId')
        .eq('clubId', clubId);

    if (membershipError) {
      console.error('Error getting memberships:', membershipError);

      return [];
    }

    const memberIds = memberShipData.map((item) => item.memberId);

    const { data: membersData, error: membersError } = await getSupabaseClient()
      .from('members')
      .select<string, MemberType>(
        `id,
      firstname,
      lastname,
      email,
      profile_image`,
      )
      .in('id', memberIds);

    if (membersError) {
      throw membersError;
    }

    return membersData;
  } catch (error) {
    console.error('Error getting members:', error);

    return [];
  }
};

export const leaveClub = async (userId: string, clubId: number) => {
  try {
    const { error } = await getSupabaseClient()
      .from('clubs_members')
      .delete()
      .eq('memberId', userId)
      .eq('clubId', clubId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error leaving club:', error);
    throw error;
  }
};

export const deleteMember = async (userId: string, clubId: number) => {
  try {
    const { error } = await getSupabaseClient()
      .from('clubs_members')
      .delete()
      .eq('memberId', userId)
      .eq('clubId', clubId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
};
